### Escuela Colombiana de Ingeniería
### Arquitecturas de Software - ARSW

## Escalamiento en Azure con Maquinas Virtuales, Sacale Sets y Service Plans

### Desarrollado por:
* Andrés Felipe Rodíguez Chaparro
* Santiago Guerra Penagos

### Dependencias
* Cree una cuenta gratuita dentro de Azure. Para hacerlo puede guiarse de esta [documentación](https://azure.microsoft.com/es-es/free/students/). Al hacerlo usted contará con $100 USD para gastar durante 12 meses.
Antes de iniciar con el laboratorio, revise la siguiente documentación sobre las [Azure Functions](https://www.c-sharpcorner.com/article/an-overview-of-azure-functions/)

### Parte 0 - Entendiendo el escenario de calidad

Adjunto a este laboratorio usted podrá encontrar una aplicación totalmente desarrollada que tiene como objetivo calcular el enésimo valor de la secuencia de Fibonnaci.

**Escalabilidad**
Cuando un conjunto de usuarios consulta un enésimo número (superior a 1000000) de la secuencia de Fibonacci de forma concurrente y el sistema se encuentra bajo condiciones normales de operación, todas las peticiones deben ser respondidas y el consumo de CPU del sistema no puede superar el 70%.

### Escalabilidad Serverless (Functions)

1. Cree una Function App tal cual como se muestra en las  imagenes.

![](images/part3/part3-function-config.png)

![](images/part3/part3-function-configii.png)

### Creación de la Function App

![Captura de pantalla 2025-04-24 084212](https://github.com/user-attachments/assets/ca4522a9-0a9c-4b34-a893-c9c33eb2ee64)


2. Instale la extensión de **Azure Functions** para Visual Studio Code.

![](images/part3/part3-install-extension.png)

### Instalación de la extensión y los paquetes necesarios 

![Captura de pantalla 2025-04-24 082817](https://github.com/user-attachments/assets/d097e90c-d61c-4eb4-a569-e9e52b50106f)

```
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```
NOTA: Existe un error al momento de desplegar, y es debido a que debemos cambiar la version del ExtensionBundle en el archivo HOST.JS, asi deberia quedar:

``` javascript
{
  "version": "2.0",
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[2.6.1, 3.0.0)"
  }
}

```

3. Despliegue la Function de Fibonacci a Azure usando Visual Studio Code. La primera vez que lo haga se le va a pedir autenticarse, siga las instrucciones.

### Desplegamos la aplicación 

![Captura de pantalla 2025-04-24 084430](https://github.com/user-attachments/assets/c3f20ebb-b9bc-4bf4-b905-53bb44735b14)

![image](https://github.com/user-attachments/assets/9499bcfa-2934-4e91-a7e3-17ec75cc1b5a)


![](images/part3/part3-deploy-function-1.png)

![](images/part3/part3-deploy-function-2.png)

4. Dirijase al portal de Azure y pruebe la function.

![](images/part3/part3-test-function.png)

### Portal De Azure

![Captura de pantalla 2025-04-24 091045](https://github.com/user-attachments/assets/beeaa5fb-6c31-4a0e-9f0c-3c8906c35ada)

![Captura de pantalla 2025-04-24 091118](https://github.com/user-attachments/assets/4191deb0-07b9-49c4-913b-194769dcb45d)

![Captura de pantalla 2025-04-24 091725](https://github.com/user-attachments/assets/af2ce111-5a99-42f5-b7c7-ccef6b6d5df7)


5. Modifique la coleción de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes. Verifique los resultados y presente un informe.



## Pruebas de Carga con Newman

Se realizaron pruebas de carga usando Newman para ejecutar 10 peticiones secuenciales a la Azure Function.

### Configuración de la prueba
- Número de iteraciones: 10
- Tipo de petición: POST
- Endpoint: https://functionprojectfibonnaci.azurewebsites.net/api/Fibonacci
- Tamaño de respuesta: 209.23KB por petición

### Resultados
![](/images/newman.png)
#### Tiempos de Respuesta
- Tiempo promedio: 12.6s
- Tiempo mínimo: 12.3s
- Tiempo máximo: 13.5s
- Desviación estándar: 418ms

#### Estadísticas de Ejecución
- Iteraciones completadas: 10/10 (100% exitosas)
- Peticiones completadas: 10/10 (100% exitosas)
- Duración total de la prueba: 2m 7s
- Datos totales recibidos: 2.09MB

#### Análisis de Resultados
- Todas las peticiones fueron exitosas (código 200 OK)
- Los tiempos de respuesta fueron consistentes, con una variación máxima de 1.2s entre la petición más rápida y la más lenta
- No se presentaron errores durante la ejecución
- El tamaño de respuesta se mantuvo constante en todas las peticiones

---
6. Cree una nueva Function que resuleva el problema de Fibonacci pero esta vez utilice un enfoque recursivo con memoization. Pruebe la función varias veces, después no haga nada por al menos 5 minutos. Pruebe la función de nuevo con los valores anteriores. ¿Cuál es el comportamiento?.
al ejecutar

## Pruebas de Rendimiento - Implementación con Memoization

### Configuración de Pruebas
Se realizaron pruebas comparativas entre la implementación anterior y la nueva implementación con memoization, ejecutando peticiones antes y después de un periodo de inactividad.

### Resultados de la Primera Implementación (Sin Memoization)
- Número de iteraciones: 10
- Tiempo promedio de respuesta: 12.6s
- Tiempo mínimo: 12.3s
- Tiempo máximo: 13.5s
- Tamaño de respuesta: 209.23KB
- Duración total: 2m 7s

### Resultados de la Segunda Implementación (Con Memoization)
#### Primera Ejecución
- Tiempo de respuesta: 682ms
- Tamaño de respuesta: 261B
- Estado: 200 OK

#### Segunda Ejecución (Después de Cache)
- Tiempo de respuesta: 604ms
- Tamaño de respuesta: 263B
- Estado: 200 OK

### Análisis Comparativo
![](/images/newman%20mem.png)
#### Mejoras Observadas
1. **Tiempo de Respuesta**
   - Implementación original: ~12.6 segundos
   - Implementación con memoization: ~600-680ms
   - Mejora: Reducción del 95% en tiempo de respuesta

2. **Tamaño de Respuesta**
   - Implementación original: 209.23KB
   - Implementación con memoization: ~262B
   - Mejora: Reducción significativa en el tamaño de la respuesta

3. **Consistencia**
   - La variación en tiempos de respuesta es menor en la implementación con memoization
   - Diferencia entre ejecuciones: solo 78ms (682ms vs 604ms)

#### Comportamiento de Caché
- Se observa una ligera mejora en el tiempo de respuesta en la segunda ejecución (604ms vs 682ms)
- La función mantiene su estado "caliente" (warm) entre ejecuciones cercanas
- El tamaño de respuesta se mantiene consistente

### Conclusiones
1. La implementación con memoization muestra una mejora sustancial en rendimiento:
   - Menor consumo de recursos (evidenciado por el tamaño de respuesta)
   - Mayor consistencia en tiempos de respuesta

2. La función demuestra un comportamiento eficiente de caché:
   - Mantiene los resultados en memoria entre llamadas cercanas
   - Proporciona respuestas más rápidas en llamadas subsecuentes



**Preguntas**

* ¿Qué es un Azure Function?
  * Respuesta: Azure Functions es un servicio en la nube sin servidor que permite ejecutar aplicaciones
    bajo demanda, gestionando la infraestructura automáticamente.
* ¿Qué es serverless?
  * Respuesta: Es un modelo de computación en la nube que permite desarrollar y ejecutar aplicaciones sin
    gestionar la infraestructura subyacente, su administración, incluyendo software y sistemas operativos
    es gestionado por el proveedor de la nube
* ¿Qué es el runtime y que implica seleccionarlo al momento de crear el Function App?
  * Respuesta: El runtime es el entorno de ejecución en el que se ejecutarán las funciones. Elegir un
    runtime implica determinar el lenguaje de programación y el entorno operativo de la Function App. Esta
    selección es clave porque cambiar el runtime posteriormente es complejo y puede requerir una
    reconfiguración significativa.
* ¿Por qué es necesario crear un Storage Account de la mano de un Function App?
  * Respuesta: En Azure, toda Function App necesita un Storage Account para poder funcionar correctamente,
    y no es opcional.Se usa para gestionar triggers, reintentos y archivos temporales, todo esto debido a
    que Azure Functions es serverless.
* ¿Cuáles son los tipos de planes para un Function App?, ¿En qué se diferencias?, mencione ventajas y desventajas de cada uno de ellos.
  * Respuesta:
  * Plan de Consumo
    * Caracteristicas: Escalado automatico, Pago por uso
    * Ventajas: Economico, escalabilidad hasta 0, ideal para funciones "event-driven"
    * Desventajas: Tiempo de arranque lento, Limite de tiempo de ejecución, no permite conexiones
      persistentes
  * Plan Premium
    * Caracteristicas: Escalado automatico mas controlado, Tiempo de ejecución ilimitado
    * Ventajas: Ideal para funciones de alto rendimiento, permite largas ejecuciones
    * Desventajas: Mas costoso que el plan anterior, requiere asignar instancias minimas y maximas
  * App Service Plan
    * Caracterisiticas: Uso de las mismas intancias que nuestros Web Apps, NO escala automaticamente
    * Ventajas: Podemos compartir infraestructura por defecto si ya usamos App Services, ideal para
      escenearios donde el consumo es constante
    * Desventajas: No escala a cero, pago por usar las las instancias todo el tiempo, asi no esten en uso 
* ¿Por qué la memoization falla o no funciona de forma correcta?
  * Respuesta: La memorización puede fallar debido a problemas de recursividad y al almacenamiento
    ineficiente de valores. Con datos grandes, el consumo de memoria aumenta significativamente, saturando
    los recursos disponibles y afectando el rendimiento.
* ¿Cómo funciona el sistema de facturación de las Function App?
  * Respuesta: Depende del plan que usemos, por ejemplo:
    * Plan de consumo: Se cobra por las cantidad de ejecuciones, por el tiempo total de ejecución y la
      memoria utilizada
    * Plan premium: Se cobra por Instancias reservadas, por el tiempo de ejcuciñon y el soporte para las
      funciones mas pesadas
    * App Service Plan: Pagamos por el tamaño y el numero de instancias del App Service
* Informe
* Correspondiente al punto 6
