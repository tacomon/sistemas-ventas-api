import express from 'express';
import UsuarioRoutes from '../routes/usuario.routes';

const app = express();
app.use(express.json());
app.use('/api/usuarios', UsuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
