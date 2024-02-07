jest.mock('http');
jest.mock('cluster');
jest.mock('./routes');
jest.mock('./utils');

import cluster from 'cluster';
import http from 'http';

import { router } from '../routes';

import { startServer } from '../server';
import { numCPUs } from '../utils';

const mockServer = {
  listen: jest.fn(),
  on: jest.fn(),
  close: jest.fn(),
};

const mockRouter = jest.fn();

const mockCluster = {
  isPrimary: true,
  fork: jest.fn(),
  on: jest.fn(),
  workers: {},
};

beforeEach(() => {
  jest.clearAllMocks();
  (http.createServer as jest.Mock).mockReturnValue(mockServer);
  (router as jest.Mock) = mockRouter;
  (cluster as unknown as jest.Mocked<typeof cluster>) = mockCluster as any;
});

test('startServer starts server in multi mode', () => {
  expect(() => {
    startServer(true);
  }).not.toThrow();

  expect(http.createServer).toHaveBeenCalled();
  expect(mockServer.on).toHaveBeenCalledWith('error', expect.any(Function));
  expect(mockServer.listen).toHaveBeenCalledWith(expect.any(Number), expect.any(Function));
  expect(cluster.fork).toHaveBeenCalledTimes(numCPUs);
  expect(cluster.on).toHaveBeenCalledWith('exit', expect.any(Function));
  expect(process.on).toHaveBeenCalledWith('SIGINT', expect.any(Function));
});

test('startServer starts server in single mode', () => {
  expect(() => {
    startServer(false);
  }).not.toThrow();

  expect(http.createServer).toHaveBeenCalled();
  expect(mockServer.on).toHaveBeenCalledWith('error', expect.any(Function));
  expect(mockServer.listen).toHaveBeenCalledWith(expect.any(Number), expect.any(Function));
  expect(cluster.fork).toHaveBeenCalledTimes(1);
  expect(cluster.on).not.toHaveBeenCalled();
  expect(process.on).toHaveBeenCalledWith('SIGINT', expect.any(Function));
});
