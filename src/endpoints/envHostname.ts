import mocksEnabled from './mocksEnabled';

export default function hostname(feat: string) {
    switch(feat){
        case 'table':
            return !mocksEnabled() ? 'http://localhost:8882' /* prod backend url should go here when ready */ : 'http://localhost:8882'
        case 'gmaps':
            return !mocksEnabled() ? 'https://maps.googleapis.com' : 'http://localhost:8882'
    }
}