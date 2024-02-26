import { Server } from 'azle';
import express, { Request } from 'express';

type Reparacion = {
    id: number,
    nombre_cliente: string,
    tipo_reparacion: string,
    modelo: string,
    monto: number,
    adelanto: number,
    deuda: number,
    info_extra: string


}

let reparaciones: Reparacion[] = [{
    id: 1,
    nombre_cliente: 'Miguel',
    tipo_reparacion: 'Cambio de desplay',
    modelo: 'Iphone X',
    monto: 1000,
    adelanto: 500,
    deuda: 500,
    info_extra: 'Parte trasera estrellada'
}];

export default Server(() => {
    const app = express();

    app.use(express.json());

    //GET
    app.get("/reparaciones", (req, res) => {
        res.json(reparaciones);
    });
    //POST
    app.post("/reparaciones", (req, res) => {
        const newReparacion = req.body;
    
        // Verificar si ya existe un registro con el mismo ID
        const existingReparacion = reparaciones.find((reparacion) => reparacion.id === newReparacion.id);
    
        if (existingReparacion) {
            res.status(400).send("Ya existe un registro con este ID");
            return;
        }
    
        reparaciones = [...reparaciones, newReparacion];
        res.send("Registro creado correctamente");
    });
    //PUT
    app.put("/reparaciones/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const reparacion = reparaciones.find((reparacion) => reparacion.id === id);

        if (!reparacion) {
            res.status(404).send("Not found");
            return;
        }

        const updateReparacion = { ...reparacion, ...req.body };
        
        reparaciones = reparaciones.map((b) => b.id === updateReparacion.id ? updateReparacion : b);

        res.send("El registro se ha actualizado con correctamente");
    });
    //DELETE
    app.delete("/reparaciones/:id", (req, res) => {
        const id = parseInt(req.params.id);
        reparaciones = reparaciones.filter((reparacion) => reparacion.id !== id);
        res.send("El registro se a eliminado correctamente");
    });

    return app.listen();
});
