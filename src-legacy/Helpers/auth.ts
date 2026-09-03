export const getAccessToken = (): string => {
	const raw = localStorage.getItem('userData');
	console.log(raw);
	if (!raw){
		throw Error('local storage token error');
	}
	const parsed = JSON.parse(raw) as { jwt: string };
	return parsed.jwt;
};