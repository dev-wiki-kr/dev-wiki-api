#!/bin/bash

echo "DB_HOST=${{ secrets.DB_HOST }}" >> .env.production
echo "DB_NAME=${{ secrets.DB_NAME }}" >> .env.production
echo "DB_PASSWORD=${{ secrets.DB_PASSWORD }}" >> .env.production
echo "DB_PORT=${{ secrets.DB_PORT }}" >> .env.production
echo "DB_SYNCHRONIZE=${{ secrets.DB_SYNCHRONIZE }}" >> .env.production
echo "DB_USERNAME=${{ secrets.DB_USERNAME }}" >> .env.production
echo "POSTGRES_DB=${{ secrets.POSTGRES_DB }}" >> .env.production
echo "POSTGRES_PASSWORD=${{ secrets.POSTGRES_PASSWORD }}" >> .env.production
echo "POSTGRES_USER=${{ secrets.POSTGRES_USER }}" >> .env.production

echo "DB_HOST=${{ secrets.DB_HOST }}" >> .env.development
echo "DB_NAME=${{ secrets.DB_NAME }}" >> .env.development
echo "DB_PASSWORD=${{ secrets.DB_PASSWORD }}" >> .env.development
echo "DB_PORT=${{ secrets.DB_PORT }}" >> .env.development
echo "DB_SYNCHRONIZE=${{ secrets.DB_SYNCHRONIZE }}" >> .env.development
echo "DB_USERNAME=${{ secrets.DB_USERNAME }}" >> .env.development
echo "POSTGRES_DB=${{ secrets.POSTGRES_DB }}" >> .env.development
echo "POSTGRES_PASSWORD=${{ secrets.POSTGRES_PASSWORD }}" >> .env.development
echo "POSTGRES_USER=${{ secrets.POSTGRES_USER }}" >> .env.development

docker compose down

docker compose up -d --build
