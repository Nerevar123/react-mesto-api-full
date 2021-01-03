// const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.ner.students.nomoreparties.space';
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.mesto.ner.works';

export const apiOptions = {
  baseUrl: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
};
