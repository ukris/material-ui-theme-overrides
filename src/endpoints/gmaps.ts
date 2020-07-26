import getBaseURL from './envHostname';
import keys from 'config/api-keys';
import mocksEnabled from './mocksEnabled';
export const gmapsUrl = getBaseURL('gmaps')

export default function getGmapsEndpoint(placeName: string) {
    mocksEnabled() && import("mocks/gmaps").then(gmapsmock => gmapsmock.constructors(placeName))
    return `${gmapsUrl}/maps/api/js?key=${keys.maps}&libraries=places`
}