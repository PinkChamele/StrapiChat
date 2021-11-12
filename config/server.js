module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  //port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'cb11d67aef5393013412a31b637b0100'),
    },
  },
  jwt: {
    secret: env('JWT_SECRET', 'b34e5b60-3829-4ba6-9421-92da7101359f'),
  },
});
