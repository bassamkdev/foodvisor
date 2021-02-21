const localhost = 'http://localhost:5001/foodvisor-5f5fc/us-central1/'
const cloudhost = 'https://us-central1-foodvisor-5f5fc.cloudfunctions.net/'

export const host =
  process.env.NODE_ENV === 'development' ? localhost : cloudhost
