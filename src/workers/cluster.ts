// src/workers/cluster.ts

export const whatDoesWorkerSay = (msg) => {
  switch (msg.method) {
    case 'methodA':
      methodA(msg.method);
      break;
    case 'methodB':
      methodB(msg.method);
      break;
    default:
    // code block
  }
};

function methodA(method) {
  console.log('Method A was called', method);
}

function methodB(method) {
  console.log('Method B was called with param:', method);
}
