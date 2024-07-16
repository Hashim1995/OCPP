import * as signalR from '@microsoft/signalr';

// const userToken: any = useReadLocalStorage('userToken');

const userToken: any = localStorage.getItem('userToken');

const notificationSocket = new signalR.HubConnectionBuilder()
  .withUrl(`${import.meta.env.VITE_APP_HUB_URL}`, {
    headers: {
      AuthPerson: userToken?.replace(/['"]+/g, ''),
      foo: 'bar'
    }
    // transport: signalR.HttpTransportType.WebSockets,
    // skipNegotiation: true
  })
  .configureLogging(signalR.LogLevel.Information)
  .build();

export default notificationSocket;
