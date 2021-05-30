import 'dotenv/config';

export default {
  name: "todo-list",
  displayName: "todo-list",
  expo: {
    apiUrl: process.env.apiUrl,
    name: "todo-list",
    slug: "todo-list",
    version: "1.0.0",
    assetBundlePatterns: [
      "**/*"
    ],
  },
}
