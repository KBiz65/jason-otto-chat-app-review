const hostName = process.env.REACT_APP_RENDER_EXTERNAL_HOSTNAME || "localhost";

export const host = `http://${hostName}:${process.env.REACT_APP_PORT || 3001}`;
