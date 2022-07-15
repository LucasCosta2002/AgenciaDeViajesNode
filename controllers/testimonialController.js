import { Testimonial } from '../Models/Testimoniales.js'

const guardarTestimonial = async (req, res) =>{

    //validar
    const { nombre, correo, mensaje} = req.body;

    const errores = [];

    if (nombre.trim() === '') {
       errores.push({mensaje: "el nombre esta vacio"})
    }

    if (correo.trim() === '') {
       errores.push({mensaje: "el correo esta vacio"})
    }
    if (mensaje.trim() === '') {
       errores.push({mensaje: "el mensaje esta vacio"})
    }
    // console.log(errores)


    if (errores.length > 0) {
    
        //consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        //mostrar vista de erroes
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    }else{

        // almacenar en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            
            res.redirect('/testimoniales')
        } catch (error) {
            console.log(error)
        }
    }
}

export {
    guardarTestimonial
}