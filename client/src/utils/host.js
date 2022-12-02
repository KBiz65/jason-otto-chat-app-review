const hostName = process.env.RENDER_EXTERNAL_HOSTNAME || "localhost";

export const host = `http://${hostName}:${process.env.PORT || 3001}`;
