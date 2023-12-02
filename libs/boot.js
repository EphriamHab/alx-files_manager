import envLoader from "../utils/env_loader";

const startServer = (api) =>{
     envLoader();  
    // eslint-disable-next-line no-undef
    const port = process.env.PORT || 5000;
    // eslint-disable-next-line no-undef
    const env = process.env.npm_lifcycle_event || 'dev';
    api.listen(port, () => {
        // eslint-disable-next-line no-undef
        console.log(`[${env}] API has started listening at port:${port}`);
      }); 
}

export default startServer;