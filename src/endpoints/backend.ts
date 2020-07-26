import getBaseURL from './envHostname';

export default function getBackendEndpoint() {
    return `${getBaseURL('table')}/future-backend-endpoint`
}