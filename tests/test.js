function closeBets(betNumbers){
	for (let bN in betNumbers){
		bN=betNumbers[bN]
		//let update = db.prepare('update bets set status=1 where betNumber='+bN)
		//update.run()
		console.log('update bets set status=1 where betNumber='+bN)
	}
}
closeBets([55,56])