import React from 'react';

export const renderSystemOption = item => {
    return (
        <option key={item.id} value={item.id} >{item.name}</option>
    );
};

const functions = {
    renderSystemOption
};

export default functions;

export const CheckForIndexHTMLChange = async (indexHTMLURL) => {
	try {
		let resp = await fetch(indexHTMLURL, { method: 'get', mode: 'cors' });
		let text = await resp.text();
		let r = /^.*<script.*\/(home.*\.js).*$/gim.exec(text);
		if (!r || r.length < 2) {
			return;
		}
		let remoteMainScript = r.length > 1 ? r[1] : null;
		if (remoteMainScript === null) {
			return;
		}
		let localMainScript = null;
		let scripts = document.body.getElementsByTagName('script');
		for (let script of scripts) {
			let rl = /^.*\/(home.*\.js).*$/gim.exec(script.src);
			if (!rl || rl.length < 2) {
				continue;
			}
			localMainScript = rl[1];
			break;
		}
		if (localMainScript === null) {
			return;
		}
        console.log(remoteMainScript);

        console.log(localMainScript);
		return remoteMainScript !== localMainScript;
	} catch (err) {
		console.log(err);
		return false;
	}
};