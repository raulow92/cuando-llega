const fetchData = (URL, setBusStop, setError, setIsLoading) => {
  setIsLoading(true);
  
  fetch(URL)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      return await response.json();
    })
    .then((data) => {
      setBusStop(data);
      setError(null);
    })
    .catch((error) => {
      setError(error.message);
      setBusStop([]);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export default fetchData;
