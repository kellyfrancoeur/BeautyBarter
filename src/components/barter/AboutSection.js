import "./AboutSection.css"

export const AboutSection = () => {
    return (
        <main className="container--about">
            <section>
                <form className="form--about">
                <h2>Welcome To Beauty Barter</h2>
                <h3><u>What We're About</u></h3>
            
                <section className = "aboutSection"><div>
                    Any one who has worked in the beauty industry has likely, at one point or another, traded services with a fellow provider. We keep each other looking and feeling our best while both supporting and promoting each other. But unless your salon was a full stop shop (which we are seeing less and less these days), you may have found yourself wishing you could trade other services as well but didn't know where to start or who to even ask. It's an awkward conversation to have with someone that you haven't already been working with.
                </div>
                <div>
                    Beauty Barter was created to help connect licensed professionals to a community of licensed professionals with similar goals - to trade their services in exchange for others. It takes the awkward conversation out of the situation because you already know the professionals that you are connecting with are also looking to trade.
                </div>
                <div>
                    Beauty Barter allows you to pick which of your services you wish to trade and those you wish to receive in return. You can set your prices to be sure you are setting up and receiving fair trades. You can include pictures of your work and links to your social media.
                </div>
                <div>
                    With Beauty Barter, you can find all the services you'll need while building your professional network and growing your clientele and the clientele of others! After all, it's a lot easier to recommend a professional that you yourself are seeing!
                </div></section>
              

                <h3><u>Rules of Beauty Barter</u></h3>
                <section className = "aboutSection">
                <div>
                    <li>
                        Must have a current license posted on profile at all times.
                    </li>
                    <li>
                        Must provide portfolio photos and links to professional social media pages.
                    </li>
                    <li>
                        Each professional sets their prices and when barters are being made, both professionals must accept the other's trades before trade is posted.
                    </li>
                    <li>
                        MUST be respectful to all members!
                    </li>
                </div>
                </section>
                <div>
                    <h3>Happy Bartering!</h3>
                </div>
                </form>
            </section>
        </main>
    )
}