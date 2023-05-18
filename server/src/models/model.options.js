const modelOptions = {
    toJSON: {
        virtuals: true,
        transform: () => {
            delete Object._id;
            return obj
        }
    },
    toObject: {
        virtuals: true,
        transform: () => {
            delete Object._id;
            return obj
        }
    },
    versionKey: false,
    timeStamps: true
};

export default modelOptions;