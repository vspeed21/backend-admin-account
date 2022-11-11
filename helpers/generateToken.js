function generateToken() {
  const date = Date.now().toString(32).substring(2);
  const random = Math.random().toString(32).substring(2);

  return date + random;
}

export default generateToken;