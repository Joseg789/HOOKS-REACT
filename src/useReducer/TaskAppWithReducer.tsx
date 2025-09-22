import { useReducer, useState } from "react";
//imports de shadcn
import { Plus, Trash2, Check } from "lucide-react";
//importamos los components que nos crea shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import taskReducer, { getInitialState } from "./taskReducer";

export const TasksApp = () => {
  const [inputValue, setInputValue] = useState(""); //state para la caja de texto donde escribimos la tarea

  //! USANDO EL REDUCER QUE CREAMOS
  //! EL REDUCER NOS DEVUELVE UN ESTADO Y UN DISPATCH PARA ENVIAR ACCIONES AL REDUCER
  //!EL REDUCER ES EL ENCARGADO DE GESTIONAR LA LOGICA DE NUESTRAS TAREAS Y ACTUALIZAR EL ESTADO
  const [state, dispatch] = useReducer(taskReducer, getInitialState());
  //!EXTRAEMOS LOS DATOS DEL ESTADO QUE NOS DEVUELVE useReducer
  const { todos, completed: completedCount, pending: totalCount } = state;
  const addTodo = () => {
    if (inputValue.length === 0) return; //si el input no contiene texto noo hacemos nada
  };

  dispatch({ type: "ADD_TODO", payload: inputValue }); //le pasamos el texto de la tarea como payload

  //vaciamos la caja de texto
  setInputValue("");

  const toggleTodo = (id: number) => {
    // le pasamos el id a dispatch para cambiar el estado completado de la tarea
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const deleteTodo = (id: number) => {
    //eliminamos la tarea
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    // layout principal
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Lista de Tareas
          </h1>
          <p className="text-slate-600">
            Mantén tus tareas organizadas y consigue hacerlas
          </p>
        </div>
        {/* usamos nuestros components de shadcn
            los personalizamos a nuestro gusto con tailwindcs */}
        <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex gap-2">
              {/* Input para añadir nuevas tareas */}
              <Input
                placeholder="Añade una nueva tarea..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
              />
              {/* Button para añadir nuevas tareas */}
              <Button
                onClick={addTodo}
                className="bg-slate-800 hover:bg-slate-700 text-white px-4"
              >
                <span>Añadir</span>
                {/* Plus icon + .... es el icono que se muestra en el botón de shadcn */}
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Mostramos el progreso de las tareas completadas */}
        {totalCount > 0 && (
          <Card className="mb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-slate-700">
                Progreso
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
                <span>
                  {completedCount} de {totalCount} completadas
                </span>
                <span>{Math.round((completedCount / totalCount) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-700">
              Tareas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todos.length === 0 ? (
              // si no hay tareas
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                  {/* Icono de verificación */}
                  <Check className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 text-lg mb-2">No hay tareas</p>
                <p className="text-slate-400 text-sm">
                  Añade una tarea arriba para empezar
                </p>
              </div>
            ) : (
              // si hay tareas
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                      //
                      todo.completed
                        ? "bg-slate-50 border-slate-200"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm"
                    }`}
                  >
                    {/* // Checkbox para marcar la tarea como completada */}
                    <Checkbox
                      checked={todo.completed} //si la tarea esta completada o no la marcamos como completada o No
                      //onCheckedChange es un evento que se dispara cuando cambiamos el estado del checkbox es de shadcn
                      onCheckedChange={() => toggleTodo(todo.id)} //cambiamos el estado de la tarea
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <span
                      className={`flex-1 transition-all duration-200 ${
                        // Si la tarea está completada, aplicamos estilos diferentes
                        todo.completed
                          ? "text-slate-500 line-through"
                          : "text-slate-800"
                      }`}
                    >
                      {todo.text}
                    </span>
                    <Button
                      // Botón para eliminar la tarea
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0"
                    >
                      {/* Icono de papelera */}
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* layout principal */}
    </div>
  );
};
