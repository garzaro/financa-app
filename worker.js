export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Rotear /api/* para o backend (Spring Boot Worker) via service binding
    if (url.pathname.startsWith("/api/")) {
      // env.BACKEND.fetch(request) encaminha a requisição original integralmente:
      // - metodo HTTP (POST, GET, etc.) é preservado
      // - headers (incluindo Cookie, Authorization) são preservados
      // - body é preservado
      // - query parameters são preservados
      // - a resposta (incluindo Set-Cookie) retorna intacta
      return env.BACKEND.fetch(request);
    }

    // Tudo o que não for /api/* serve os assets estáticos (React/Vite)
    return env.ASSETS.fetch(request);
  }
};
