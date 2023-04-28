// We want to implement a Url class that can hold all the components of a standard
// URL, validate them, and format them back into a string.

// PROBLEM WITHOUT BUILDER PATTERN
// SO MANY PARAMETERS REQUIRED
// UNREADABLE CODE

class URL {
  constructor(protocol, username, password, hostname, port, pathname, search, hash) {
    this.protocol = protocol;
    this.username = username;
    this.password = password;
    this.hostname = hostname;
    this.port = port;
    this.pathname = pathname;
    this.search = search;
    this.hash = hash;
  }

  validate() {
    if (!this.protocol || !this.hostname) {
      throw new Error("You must specify at least protocol and hostname");
    }
  }

  toString() {
    let url = "";
    url += `${this.protocol}://`;

    if (this.username && this.password) {
      url += `${this.username}:${this.password}//`;
    }

    url += `${this.hostname}:`;

    if (this.port) {
      url += `${this.port}`;
    }

    if (this.pathname) {
      url += this.pathname;
    }

    if (this.search) {
      url += `?${this.search}`;
    }

    if (this.hash) {
      url += `#${this.hash}`;
    }
    return url;
  }
}

const firstInstance = new URL("https", null, null, "example.com", null, null, null, null);

// INTUITIVE IMPLEMENTATION WITH BUILDER PATTERN

class BuilderUrl {
  setProtocol(protocol) {
    this.protocol = protocol;
    return this;
  }

  setAuthentication(username, password) {
    this.username = username;
    this.password = password;
    return this;
  }

  setHostName(hostname) {
    this.hostname = hostname;
    return this;
  }

  setPort(portNumber) {
    this.port = portNumber;
    return this;
  }

  setPathName(pathname) {
    this.pathname = pathname;
    return this;
  }

  setSearch(search) {
    this.search = search;
    return this;
  }

  setHash(hash) {
    this.hash = hash;
    return this;
  }

  build() {
    return new URL(
      this.protocol,
      this.username,
      this.password,
      this.hostname,
      this.port,
      this.pathname,
      this.search,
      this.hash
    );
  }
}

// SIMPLIFICATION OF PARAMETERS
const simplified_url_instance = new BuilderUrl()
  .setProtocol("https")
  .setHostName("google.com")
  .setPort(3000)
  .setAuthentication("rohan", "tiwari")
  .build();

console.log(simplified_url_instance.toString());
