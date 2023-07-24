module.exports = {
  port: 8080,
  jwtSecret:
    "074ec556-1a86-4e8f-9913-6553156f99ce-591e0d3b-f9aa-4242-aed6-1abba8129716",
  tokenMaxAgeMins: 10080,
  authCookieSettings: {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  },
};
