const calculateRemainingTime = (expirationTime) => {
    const currentTime = Date.now();

    const remainingTime = expirationTime - currentTime;

    return remainingTime;
  };

  export default calculateRemainingTime;