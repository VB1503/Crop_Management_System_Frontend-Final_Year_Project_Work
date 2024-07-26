import React from 'react';

const FertilizerRecommendationResult = () => {
    return (
        <div className="flex items-center container mx-auto my-16">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 justify-items-center">
                <div className="py-4">
                    <div className="bg-blended-almond py-4 px-6 rounded-lg shadow-md">
                        <p className="text-center text-lg text-black font-semibold">The N value of soil is high and might give rise to weeds. Please consider the following suggestions:</p>
                        <ol className="list-decimal pl-8">
                            <li>Manure – adding manure is one of the simplest ways to amend your soil with nitrogen. Be careful as there are various types of manures with varying degrees of nitrogen.</li>
                            <li>Coffee grinds – use your morning addiction to feed your gardening habit! Coffee grinds are considered a green compost material which is rich in nitrogen. Once the grounds break down, your soil will be fed with delicious, delicious nitrogen. An added benefit to including coffee grounds to your soil is while it will compost, it will also help provide increased drainage to your soil.</li>
                            <li>Plant nitrogen fixing plants – planting vegetables that are in Fabaceae family like peas, beans and soybeans have the ability to increase nitrogen in your soil</li>
                            <li>Plant ‘green manure’ crops like cabbage, corn and brocolli</li>
                            <li>Use mulch (wet grass) while growing crops - Mulch can also include sawdust and scrap soft woods</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FertilizerRecommendationResult;
