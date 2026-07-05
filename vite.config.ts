import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(() => {
  // 检查是否在 GitHub Actions 的环境中运行
  const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

  return {
    plugins: [react()],
    // 如果是 GitHub 部署，使用仓库名作为路径；如果是 Netlify/Vercel/本地开发，使用根路径 "/"
    base: isGitHubActions ? "/YutongSun-Personal-Website/" : "/",
  };
});
