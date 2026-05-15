# Apenas serve os arquivos já buildados localmente
FROM nginx:stable-alpine

# Remover config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar config customizada (suporte ao React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar o build gerado localmente
COPY build/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]