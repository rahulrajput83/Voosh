import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import MongoDBConnect from '../../../Utils/MongoDB';
import RegisterModel from '../../../Model/NewUser';
const jwt = require('jsonwebtoken');


/* Google Login Implementation */
export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      await MongoDBConnect();
      let accessToken;

      if (user) {
        console.log('user', user)
        const responseData = await RegisterModel.findOne({ email: user.email });
        if (responseData) {
          accessToken = await jwt.sign({ id: responseData._id, email: responseData.email }, process.env.JWT);
        } else {
          const name = user.name.split(" ");
          const createNewUser = new RegisterModel({
            firstName: name[0] || '',
            lastName: name[1] || '',
            email: user.email,
            imgUrl: user.image
          });
          await createNewUser.save();
          accessToken = await jwt.sign({ id: createNewUser._id, email: createNewUser.email }, process.env.JWT);
        }
      }

      if (accessToken) {
        token.accessToken = accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.JWT,
});
