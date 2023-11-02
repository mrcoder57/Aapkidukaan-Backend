import jwt from 'jsonwebtoken';

export function authenticateUser(req, res, next) {
 const token = req.headers.authorization;
//  console.log(token);

 if (!token) {
   return res.status(401).json({ error: 'No token provided' });
 }

 jwt.verify(token, 'aapkaswagathai', (err, decoded) => {
   if (err) {
     return res.status(500).json({ error: 'Failed to authenticate token',token });
   }

   req.user = decoded;
   next();
 });
}
