# Estágio 1: Build da aplicação
FROM node:20-alpine AS build

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência (package.json e package-lock.json)
COPY package*.json ./

# Instala as dependências 
RUN npm ci

# Copia o restante do código da aplicação
COPY . .

# Executa o build de produção
# (O comando npm run build cria o diretório 'dist')
RUN npm run build

# Estágio 2: Servidor Web de alta performance (Nginx)
FROM nginx:stable-alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a configuração customizada (suporte ao React Router / SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados no estágio de build --from= ../app/dist
COPY dist/ /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]


# Deixei aqui comentado caso queira usar o Docker Antigo
#
# Apenas serve os arquivos já buildados localmente
# FROM nginx:stable-alpine

# Remover config padrão do nginx
#RUN rm /etc/nginx/conf.d/default.conf

# Copiar config customizada (suporte ao React Router)
#COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar o build gerado localmente
#COPY dist/ /usr/share/nginx/html

#EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]