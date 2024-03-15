#!/bin/bash

echo "Menjalankan Watcher WDYM"

# Mengecek apakah folder node_modules sudah ada
if [ ! -d "node_modules" ]; then
    echo "Folder node_modules tidak ditemukan. Menjalankan npm install..."
    npm install
fi

# Menjalankan aplikasi
node .
