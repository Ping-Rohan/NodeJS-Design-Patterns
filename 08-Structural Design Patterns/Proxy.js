// A proxy is an object that controls access to another object, called the subject.

// PROXY_USES

/*
    Data validation: The proxy validates the input before forwarding it to the
    subject

    Security: The proxy verifies that the client is authorized to perform the
    operation, and it passes the request to the subject only if the outcome of the
    check is positive

    Caching: The proxy keeps an internal cache so that the proxied operations
    are executed on the subject only if the data is not yet present in the cache

    Lazy initialization: If creating the subject is expensive, the proxy can delay
    it until it's really necessary

     Logging: The proxy intercepts the method invocations and the relative
    parameters, recoding them as they happen

    Remote objects: The proxy can take a remote object and make it appear local

*/
