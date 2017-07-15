const listeners = [];

let activeRequests = 0;

export default function subscribeRequestStatus(fn: Function) {
  listeners.push(fn);
}

function notifyListeners() {
  listeners.forEach(fn => fn(activeRequests > 0));
}

function trackRequestStarted() {
  activeRequests += 1;
  notifyListeners();
}

function trackRequestEnded() {
  activeRequests -= 1;
  notifyListeners();
}

const origSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.send = function(...args) {
  trackRequestStarted();
  this.addEventListener('load', trackRequestEnded);
  this.addEventListener('error', trackRequestEnded);
  origSend.apply(this, args);
};
