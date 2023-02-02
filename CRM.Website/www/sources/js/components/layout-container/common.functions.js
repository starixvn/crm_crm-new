import React from 'react';
import axios from 'axios';
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
	await axios.get(indexHTMLURL, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(resp => {
		if(!resp || !resp.data) {
			return false;
		}
		let text =  resp.data;
		let scriptMatch = /^.*<script.*\/(home.*\.js).*$/gim.exec(text);
		if (!scriptMatch || scriptMatch .length < 2) {
			return false;
		}
		let remoteMainScript = scriptMatch.length > 1 ? scriptMatch[1] : null;
		if (remoteMainScript === null) {
			return false;
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
			return false;
		}
		console.log(remoteMainScript);
		console.log(localMainScript);
		return remoteMainScript !== localMainScript;
	});
};