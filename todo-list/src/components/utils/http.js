export const checkIfAuthorized = ({ status }) => {
  if ([401, 403].includes(status)) {
    return Promise.reject();
  }
  return Promise.resolve();
};
