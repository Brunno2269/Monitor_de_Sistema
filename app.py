from flask import Flask, render_template, jsonify
import psutil
import webbrowser
import os
import signal
import sys

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def get_data():
    cpu_percent = psutil.cpu_percent(interval=1)
    mem_info = psutil.virtual_memory()
    mem_percent = mem_info.percent

    return jsonify({
        'cpu_percent': cpu_percent,
        'mem_percent': mem_percent
    })

@app.route('/fechar_guia', methods=['POST'])
def fechar_guia():
    print("Guia fechada. Encerrando servidor...")
    os._exit(0)  
    return '', 204  

def abrir_navegador():
    webbrowser.open_new('http://127.0.0.1:5000/')

def encerrar_servidor(signal, frame):
    print("\nServidor encerrado. Fechando o terminal...")
    sys.exit(0)

if __name__ == '__main__':
    abrir_navegador()
    signal.signal(signal.SIGINT, encerrar_servidor)
    app.run(debug=False)