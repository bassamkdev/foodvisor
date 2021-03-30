import '@testing-library/jest-native/extend-expect';
import {server} from './test/server'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { queryCache } from "./test/test-utils";

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
afterEach(() => queryCache.clear())
