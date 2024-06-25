export const technicianModel = (raw:any)=>{

    const data = raw?.data || {};    

    // delete raw.data

    return{
        ...raw,
        ...data,
        ...data?.data,
    }
}