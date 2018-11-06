# feature_model_designer
Por medio de esta visualización se puede crear feature models acorde al alcance definido en la herramienta de Feature IDE de Eclipse sin tener en cuenta la creación de constraints. Esto significa que se puede crear un arbol de features donde cada nodo excepto el raiz puede ser mandatory, optional o puede estar agrupado con sus hermanos como or o alternative. 
La visualización tiene las siguientes funcionalidades: 
Desplegar hijos de un nodo:Se puede dar click sobre el nodo y esto despliega y reubica todos los nodos hijos. Los nodos que son hojas estan en color verde, los nodos que son padre de alguno estan en color cafe.
Agregar un nodo hijo:Al dar clic en un nodo en la parte superior izquierda se muestra el nombre de este nodo. Si se desea agregar a este nodo un hijo se debe diligenciar el input que esta debajo del nombre del nodo con el nombre del hijo que se desea agregar. Se puede seleccionar el tipo de nodo, si es mandatory u optional, o si va a estar agrupado con sus hermanos como tipo or o alternative. Si se selecciona algun tipo de agrupación esta primará sobre el tipo de nodo.
Actualizar nodo:Al dar clic en un nodo en la parte superior izquierda se muestra el nombre de este nodo. Se puede diligenciar el input que esta debajo del nombre del nodo y al dar clic en actualizar nodo se modificará el nombre del mismo. Si se selecciona un tipo de nodo, este nodo será mandatory u optional respecto a su padre, y si se selecciona un tipo de agrupación, los nodos hijos seran or o alternative.
Borrar nodo:Se debe dar clic sobre el nodo que se desea borrar y dar clic en el boton borrar. 

Los nodos de tipo mandatory tiene un circulo relleno de negro en su parte superior, los nodos de tipos optional tiene un circulo relleno de blanco en su parte superior, los hijos con tipo de agrupación or tienen las lineas a su padre punteadas sin un circulo en la parte superior, y los hijos con tipo de agrupación alternative tienen las lineas a su padre continuas sin un circulo en la parte superior.

WHAT
Atendiendo a que la tarea principal es de produce, la fuente original es un tree en formato json y a medida que se va interactuando con la visualización se va aumentando este tree. En este orden de ideas los siguientes son los campos con los que se trabajó dentro del tree: 

name (categorico): Almacena el nombre del feature. Debe ser unico.
metadata.id (categorico ordenado): Almacena un id unico para cada nodo cuya estructura describe en que posición del arbol esta.
metadata.typeson (categorico): Describe el tipo de agrupación que se va a aplicar a los hijos. Puede ser or, xor o null
metadata.type (categorico): Describe el tipo de nodo. Puede ser mandatory u optional.

WHY
Anotate features: Permite crear, editar y borrar features anotando sus respectivos atributos (nombre, tipo) y relaciones (tipo de agrupación)
Explore features: Permite adentrarse o alejarse de los diferentes niveles que conforman un arbol de features.
Present and discover extremes: Permite visualizar el primer nodo y los hojos de tipo hoja en el arbol de manera intuitiva.
Identify features: Permite seleccionar un feature especifico. 

HOW
Marca - punto:

Posición espacial (Separate order and align):Los puntos corresponden a los rectangulos que representar cada feature. Estos rectangulos estan separados ordenados y alineados por los niveles del arbol y por la posición de los nodos vecinos que se encuentren desplegados.
Color hue (Express): El color representa si el nodo tiene hijos o si es una hoja. 
Manipulate: Select and change de los nodos dado que al seleccionar se modifica la visualización desplegando o colapsando otros nodos hijos.


Marca - linea:

Posición espacial (Express and align):Por medio de la posición de una linea uniendo dos puntos expresa una relación entre features, y es alineada los niveles y la ubicación de los nodos vecinos.
Shape (express)La forma de la linea (punteada, o no punteada) representa si la relación de los hijos de un feature es de tipo de agrupación or o xor.

INSIGHTS: 
Las funcionalidades construidas en la visualización suplen el alcance actual que tienen otras herramientas del mercado como Eclipse con Feature IDE o como SPLOT respecto al diseño de modelos de features y es escalable respecto a la integración de la configuración de atributos y constraints.

TECNOLOGIAS: 
d3v5, javascript, css y html.
  ![alt text](https://s3.us-east-2.amazonaws.com/testing.alvarod/captura.PNG)

https://adgonzalez02109.github.io/feature_model_designer/

Autor: Alvaro Diego Gonzalez Vesga.
Este proyecto esta bajo licencia MIT.
