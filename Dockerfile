FROM node:22

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY . .

RUN pnpm install --frozen-lockfile

CMD ["pnpm", "run", "start:dev"]
