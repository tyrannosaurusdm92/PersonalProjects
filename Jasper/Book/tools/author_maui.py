#!/usr/bin/env python3
"""Publish a complete teen-rated Maui/Jasper origin romance and rebuild the offline site."""
from pathlib import Path
import json
import re

ROOT=Path(__file__).resolve().parents[1]
SERIES_FOLDER=ROOT/"json/Disney/Maui-And-Jasper"
SERIES_SLUG="the-shore-i-choose"

CHAPTERS=[
("A Stranger in the Tide", """The first thing I remembered was the sound of water.

Not where I had been before it. Not how I had arrived. Not the faces that might have called me home. Only the endless, patient withdrawal of the tide, taking a thin lace of foam back across dark sand.

I lay on a beach beneath a sky full of unfamiliar stars. My mouth tasted of salt. There was a little brass key tied to my wrist with blue thread, and I knew three things about it: it was mine, it mattered, and I had no idea why.

I sat up too quickly. The shore tilted.

“Careful, little human. If you're going to faint, try to pick somewhere with a better view.”

The voice belonged to a man the size of a very confident mountain. He stood beside an outrigger canoe pulled above the surf, carrying a fishhook nearly as big as I was. Tattoos covered his arms and chest, and one of them appeared to be watching me with a suspicious expression.

I stared. He grinned.

“Yes, the tattoos move. Yes, I'm magnificent. You can ask the important questions in whichever order you like.”

“What beach is this?”

His smile faltered by a fraction.

“Okay. Apparently we're starting with geography.”

“And who are you?”

That brought it back. He spread his arms wide enough to make the rising sun look as though it belonged to him.

“Maui. Demigod, legendary wayfinder, rescuer of the sun, occasional hero to people who forget to send thank-you gifts.”

“I don't think I've ever heard of you.”

The tattoo of a little man on his chest doubled over laughing.

Maui looked offended on principle. “Well. That's a new one.”

I meant to apologize, but something else was happening. The more I searched for my own name, the more the inside of my head felt like a house in which all the doors had been painted over. I could remember the purpose of a spoon, the shape of a storm cloud, and how to tell when somebody was pretending not to worry. I could not remember a single person who had loved me.

“I don't know who I am,” I said.

The words sounded small against the sea.

Maui stopped performing. Not completely; I suspected that would require a natural disaster. But he lowered the hook and sat on a rock several careful steps away.

“Do you know if you're hurt?”

“I don't think so.”

“Hungry?”

“Yes.”

“Excellent. Two questions answered. We're already making progress.”

He produced a piece of fruit from a bag by the canoe, held it out, and waited until I reached for it. He didn't move closer without permission.

“There's a place inland,” he said, nodding toward a green valley between the cliffs. “Lanterns, a spring, doors that lead places they shouldn't. I've been trying to find out what makes them open. Then I found you. With that.”

He pointed at my wrist.

I touched the brass key. A faint warmth moved through the blue thread.

“Does it tell you who I am?”

“No.” His answer came quickly, without the usual flourish. “And I'm not going to invent an answer just to sound impressive.”

“That must be difficult for you.”

The grin returned. “You have no idea.”

We walked toward the trees when I could stand. Maui carried his hook over one shoulder and kept pace with me even when I moved slowly. At the edge of the forest I looked back.

The tide had already erased the shape my body had left in the sand.

For a moment I was terrified that the world would do the same to the rest of me.

Maui seemed to notice. He didn't promise that my memory would return. Instead he pointed out a path where lanterns hung from the branches, each with a different color of flame.

“Come on,” he said. “Let's find out what kind of trouble you like.”

I followed him, because I could make that one decision without remembering anything else."""),
("The Hook and the Horizon", """The Lanternweald was apparently a place that had been built by people who couldn't agree on which century they lived in.

Its paths wound through old stone houses, tiled roofs, little gardens, and bridges that crossed streams too shallow to justify the engineering. A spring beneath a ring of lanterns occupied the center of the settlement. Someone had left bread on a bench and written a note asking whoever took the last piece to make more.

Maui called the square Lanternwell.

“Who lives here?” I asked.

“People who found it. People who needed it. People who haven't decided. I haven't taken a census.”

“You could.”

“I could do a lot of things. Most of them involve a hook.”

He took me to Tideglass Cove, where he had left the canoe. The water there was calmer than on the outer beach, sheltered by two headlands shaped like open hands. A half-finished dock leaned into the tide.

“You know boats?” he asked.

“I don't know.”

“Great. You can discover whether you hate them before I let you near the sail.”

By noon I had learned that knots obeyed rules, my fingers remembered more than my head did, and Maui believed every mistake was improved by an audience. He demonstrated a bowline with extravagant confidence. I repeated it incorrectly. He made a speech about the importance of watching legends carefully.

Then he inspected my second attempt and went quiet.

“That's good,” he admitted.

I looked down. The knot lay neat and sturdy in my palms.

“I didn't remember learning.”

“You still learned.”

It was such a simple distinction that I nearly missed it.

Later we pushed off from the cove. Maui kept the canoe close to shore and explained how the wind moved across the sail. He spoke of stars as navigational companions, but admitted the sky above the Lanternweald did not always obey the ones he knew. I asked him whether that frightened him.

“Frightened? Me?”

The little tattoo of Maui on his chest covered its eyes.

“Okay, challenged,” he amended. “There's a difference.”

The wind rose. I pulled the wrong line and the sail snapped, making the whole craft lean.

“Release it,” Maui said.

I froze.

“Hey. Look at me. Not the water. The line.”

My hands loosened. The sail settled. We righted ourselves.

On shore I expected a lecture. Instead Maui gave me a cup of fresh water and sat beside the overturned canoe, watching the light.

“Why didn't you just fix it?” I asked.

“Because you wanted to learn.”

“You could have been hurt.”

He shrugged, then saw my expression and corrected himself. “I knew where the safe shore was. I wouldn't have made you carry the risk alone.”

The thought sat somewhere deep inside me: somebody had once confused teaching me with leaving me responsible for everything. I could feel the shape of the memory without seeing its face.

Maui watched me with an unusual stillness.

“Did something come back?”

“Only a feeling.”

“Good one?”

“No.”

He didn't demand the story. He tossed a small piece of driftwood between his hands.

“I've had whole islands call me a hero and still not believe I belonged there,” he said. “A feeling can stick around longer than a fact. Doesn't mean it gets to captain the boat.”

I laughed, despite myself. “You turn everything into a boat lesson?”

“Only the important stuff.”

When we returned to Lanternwell, I tied the canoe with the knot I had learned. Maui tested it once, then left it alone.

The rope held.

For the first time since waking on the shore, I allowed myself to believe that I might, too."""),
("The Name Beneath the Bell", """The bell under Lanternwell Square was not supposed to ring.

That was what Neri, the valley's oldest resident, told us as we knelt beside the spring. Neri had grey curls, a walking stick cut from dark wood, and the unsettling habit of noticing questions before people asked them.

“It hasn't sounded since the last lost traveler found their way,” they said.

“Lost traveler?” I repeated.

Neri looked at Maui. Maui suddenly became interested in examining a crack in the stone.

“The valley does not take people,” Neri explained. “Doors open. Travelers choose. Sometimes someone arrives before they remember the road behind them.”

“Can the spring tell me who I was?”

“It can show what is attached to the key. Whether you wish to look is yours.”

I unwound the blue thread at my wrist. The brass key slid into my palm. There was a tiny notch near its teeth, shaped like a half-moon.

Maui held the lantern while I approached the water. He did not reach for my hand. I was beginning to understand that his restraint was deliberate.

The moment the key touched the spring, a bell rang beneath the stones.

I saw a kitchen with a window full of rain. A table covered in papers. Someone telling me I would always be the dependable one. The memory flashed away before I could decide whether the voice had been loving or demanding.

Then came a word, clear as a pebble hitting the bottom of a well.

Jasper.

I stumbled. Maui caught my elbow only after I reached for him.

“That's my name,” I whispered.

Neri waited.

I said it again, testing the sound against the shape of myself. “Jasper.”

Maui tried it with exaggerated solemnity. “Jasper. Excellent name. Strong. Dramatic. Goes with heroic companions.”

“I'm standing right here.”

“Which proves my point.”

I laughed, and the sound broke something open that fear had kept shut.

The spring held no more pictures. I expected disappointment, but I felt a strange tenderness toward the one small thing it had given me.

“Does knowing your name help?” Maui asked as we crossed the square.

“Yes. No. Maybe.” I looked at the houses. “I don't know if I liked who I was.”

He stopped near a row of lanterns.

“Then don't decide that today.”

“What if I never remember?”

“Then you'll still be Jasper, if you want to be.”

I stared at him. People who called themselves heroes were supposed to tell you what came next. Maui, who clearly adored the sound of his own voice, had somehow left the important space empty.

“Is that all?” I asked.

“Nope. Now I'm going to brag about how I helped the most fascinating person on this coast discover a name. It'll take at least twenty minutes.”

“You didn't discover it. I did.”

He smiled, sharp and delighted.

“Exactly.”

That evening I took the brass key to the little room Neri had offered above the Lanternwell bakery. I wrote my name on a scrap of paper and pinned it beside the bed, not because I feared forgetting it again but because I liked being able to choose where it belonged.

Down below, Maui was telling someone a very inaccurate version of our morning.

I opened the window.

“You left out the part where you nearly fell in the spring!”

He looked up, grinning.

“Artistic license!”

For the first time, the name Jasper felt less like a missing label and more like an introduction."""),
("The Things Hands Remember", """There were six lanterns along the eastern footbridge, and three were broken.

Neri offered to find a carpenter. Maui offered to carry the entire bridge to a different river. I asked to see the fittings.

The first bolt came loose beneath my fingers. I took apart the little brass housing, checked the wick assembly, and sketched a safer support on the back of a flour receipt. I didn't know how I knew where the strain would travel. My hand simply drew the answer.

Maui leaned close enough to see without crowding me.

“Were you an inventor?”

“Maybe.”

“A locksmith? A shipwright? A magnificent criminal mastermind?”

“Please don't get excited about that last possibility.”

“Too late.”

By afternoon I'd repaired two lanterns and convinced Maui to stop holding pieces directly over my head. He could lift anything; that did not make him the ideal person to hold every tool.

When the third lantern lit, several neighbors clapped. I smiled, then found myself apologizing because one housing was slightly crooked.

Maui blinked.

“Why are you sorry?”

“I should have done it better.”

“It's working.”

“I know, but—”

“But what?”

I tried to answer. The remembered voice returned, without a face: If you have the ability, you have the responsibility. Don't make this about you.

My stomach tightened.

Maui's expression changed. He set down the last tool.

“Hey. You get to be pleased when you make something good.”

“It isn't that simple.”

“Then tell me the complicated version.”

I couldn't. Not yet.

Instead I handed him a cup of water, remembering he'd forgotten to drink while helping. He accepted it, then held it up in a mock toast.

“To the person who repaired the bridge.”

“You did the heavy lifting.”

“Yes, and I was incredible. But I'm not stealing your applause.”

That evening we crossed the bridge together. The lanterns illuminated a garden Neri had planted below. I stopped to admire a row of herbs, and Maui followed my gaze.

“You like growing things?”

“I think so.”

“Good. We'll find you a patch of ground. One you can make mistakes in without apologizing to the dirt.”

I laughed hard enough to lean against the railing.

Maui looked pleased, but a little shy when I caught him watching me. It was the first time I'd seen pride turn uncertain on his face.

“You really don't mind that I don't remember?” I asked.

“I mind that it hurts you.”

“That wasn't my question.”

“No.” He looked at the river. “I don't mind not knowing everything about you.”

“That's a first for a demigod, I imagine.”

“I contain multitudes.”

I watched the water carry the broken reflections of three new lanterns downstream.

“Thank you,” I said.

His smile softened.

“Anytime, Jasper.”

It was the first time he'd said my name without making it part of a performance. That somehow mattered more than all his grand speeches put together."""),
("Where the Water Goes", """Maui's fishhook could move stone, calm a snarled rope, and turn its owner into an alarming number of animals. It could not persuade a tiny brass compass to point north.

“Defective,” he announced.

“You keep holding it beside the hook.”

“Which should make it grateful.”

The compass was Neri's. It had begun spinning three days earlier, when a Threadway opened at the foot of Tideglass Cove and let in a cold tide from somewhere none of us recognized. The current was taking sand from the beach and pulling it toward a crack beneath the rocks.

If it continued, the little harbor would lose its shelter.

Maui wanted to plug the crack with a boulder. I wanted to map the current first.

We argued on the shore while seabirds wheeled overhead.

“You're making a plan for a puddle,” he said.

“It's an inlet with moving water.”

“Very threatening water.”

“It might be, if you stop pretending the only answer is being bigger than the problem.”

His face closed.

I regretted the sharpness before I had finished speaking, but I did not apologize for the idea.

“I'm going to measure it,” I said. “You can help, or not.”

I took string, weights, and strips of colored cloth down the beach. After a long silence, Maui picked up the heaviest bundle.

“Tell me where,” he said.

For two hours we tracked the current. The water was not trying to drag the shore away. It was being pulled through a doorway beneath the rocks, one that had opened unevenly and become stuck.

Maui knelt beside the opening.

“So. Boulder's a bad idea.”

“Spectacularly.”

He gave me a narrow look. “Enjoy this moment. It is rare.”

We worked together. He shifted the rocks enough for me to reach the bent brass ring at the heart of the door. I adjusted it, checked where the pressure would go, and used the blue thread from my old key to mark the safe alignment. When Maui returned the last stone, the inlet took a breath and settled.

The compass stopped spinning.

At sunset, we sat above the cove with sand in our shoes. I nudged his shoulder.

“You didn't have to let me win the argument.”

“I didn't.”

I looked at him.

“You were right,” he said. “That's different.”

The admission cost him something. I could see it in the way his hand tightened around the hook.

“Does being wrong hurt?” I asked.

He laughed without humor. “When everyone expects you to save them? Yes.”

I thought of the voice from my memory, the one that had taught me usefulness was a debt.

“I know that feeling,” I said.

For a while we watched the water go where it was meant to go.

Then Maui asked whether I wanted him to teach me to steer by stars that changed their positions every night. I asked whether he could actually do that.

“No,” he said. “But it sounds like a magnificent challenge.”

I took his offered hand to stand.

For once the horizon didn't seem to be demanding that either of us prove we deserved to be standing in front of it."""),
("A Song for the Unfinished", """The first visitors from Aotearoa reached the Lanternweald on an evening of mist.

They came through a Threadway carrying instruments, wrapped food, and stories they had chosen to share. Their organizer, Mereana, introduced herself as a Māori performer and teacher. She spoke carefully about her community, her own teachers, and the fact that no single person could speak for every iwi or every tradition.

Maui tried to greet her with the sort of theatrical flourish he usually reserved for a crowd.

Mereana smiled. “I have met impressive storytellers before.”

“Impossible. Nobody this impressive.”

“Then perhaps you'll enjoy listening for a change.”

I had to turn away to hide my grin.

The gathering took place beneath a roof of woven branches beside Lanternwell Square. Mereana spoke of the whare tapere, places associated with storytelling, recreation, music, movement, and meetings between people, including lovers in some traditions. Her group offered a contemporary presentation: a poi performance shaped around a story of separation and reunion, paired with a waiata aroha they had chosen for the evening.

She explained that waiata aroha could carry longing, grief, or love; poi had its own histories and purposes; and haka was not a generic courtship routine. This evening's piece was their artistic interpretation, not a claim to perform an ancient universal wedding ritual.

I listened to the rhythm of the poi and the steadiness of the performers. The motions were practiced, the story held in a community, not borrowed for someone else's decoration.

Beside me Maui went quiet.

Afterward, Mereana invited questions. Maui asked about the history of the performance with a seriousness that surprised me. He did not pretend that all Polynesian islands shared one identical custom. He listened when she spoke of Aotearoa and of the traditions particular to her people.

When the visitors began serving food, Maui drew me aside toward the edge of the square.

“I had a big speech planned,” he admitted.

“That's shocking.”

“I know. But then I realized it was their night to tell a story.”

“That's almost growth.”

He put a hand over his heart. “You wound me.”

We walked between the lanterns while distant voices carried from the gathering. Maui looked at his tattoos.

“Every mark says what I did,” he said. “People think that means they know everything about me.”

I thought of the name I'd found in the spring, and all the rest still hidden.

“Maybe it only means they know where some stories begin.”

He considered that.

Then he held out his hand.

“Dance?”

“Did you learn that from Mereana?”

“No. I'm asking you to dance with me. Our own steps. No pretending it's somebody else's tradition.”

I took his hand.

He tried an exaggerated turn that would have looked heroic if he hadn't nearly stepped into a flower bed. I laughed, pulled him back, and found a gentler rhythm on the lanternlit stones.

There was nothing ceremonial about it. It was clumsy, private in the middle of a public square, and entirely ours.

Maui watched my face as though waiting for me to decide whether I wanted to keep going.

I did.

The voices from the gathering rose warmly behind us. The people who had shared their art remained its owners. I carried away an understanding, not a souvenir.

And in the soft circle of lanternlight, I chose another dance."""),
("A Dance That Asked", """Maui had learned to ask before making plans for me.

He was worse at asking about himself.

For three days he had been rebuilding a small landing at Tideglass Cove without admitting it was meant for our canoe. He'd set the planks square, straightened the posts, and then pretended he had happened to wander by whenever I visited.

On the fourth morning I caught him carving a little pattern along the railing.

“That's a lot of work for a dock nobody asked for.”

“I'm excellent at unrequested excellence.”

“Are you making it for me?”

He looked at the wood.

“I thought you might like somewhere to come back to.”

My chest tightened. Not from fear this time.

“I do.”

He set the knife aside. His tattoos had gone still.

“Can I ask you something?” I said.

He made a show of squaring his shoulders. “The answer is probably yes.”

“Do you ever get tired of being the hero?”

The smile disappeared.

“I don't know what I am if I'm not useful.”

I knew how much courage the words cost him. I sat on the edge of the dock, leaving room for him to decide whether to sit too.

“I'm starting to remember things,” I said. “Not names. Expectations. People needing answers before I had time to think. I think I learned to make myself useful because I was afraid nobody would keep me otherwise.”

Maui lowered himself beside me.

“That's a terrible bargain,” he said.

“It's the one I knew.”

He watched the waves for a long moment.

“Sometimes I think the tattoos are all anyone really wants.”

I reached toward his hand and stopped. “May I?”

He turned his palm upward.

His hand was warm and enormous around mine. He didn't look like a legend then. He looked like someone who had carried a heavy thing so long he no longer knew where to put it down.

“You can be here without fixing anything,” I told him.

“So can you.”

I smiled. “We'll probably both need reminding.”

That evening we returned to the place beside the Lanternwell where we had danced after Mereana's performance. There was no audience and no music beyond the wind in the trees.

Maui bowed with theatrical extravagance. “May I have this dance?”

“You've been practicing.”

“I am a natural.”

“You nearly stepped into a flower bed last time.”

“A strategic maneuver.”

I took his hand. Our steps were better, or at least less dangerous to the plants. He let me lead for a little while; I let him spin me when I wanted to be spun. We stopped whenever one of us needed to adjust.

When we came close enough that our foreheads nearly touched, he looked suddenly uncertain.

“I want to kiss you,” he said. “But I don't want it to be another thing you feel you owe someone.”

“You don't have to earn it,” I told him. “And neither do I.”

“Is that a yes?”

I answered him with one.

The kiss was gentle and imperfect. Maui laughed softly against my forehead afterward, surprised by his own happiness.

“I could get used to this,” he said.

“To dancing?”

“To asking and getting an answer I can trust.”

We stayed beneath the lanterns until they dimmed. There were no grand vows and no declarations carved into stone.

Only two people who had learned that an invitation was more meaningful than a demand."""),
("What the Door Kept", """The Threadway beneath Lanternwell opened for my key on the first cold morning of the season.

Neri found me standing before it, watching a pale rectangle of light reveal the shape of an ordinary room. Inside was a desk, a chair, a stack of letters, and the faded pattern of a curtain I suddenly recognized.

My hands went numb.

“That's where I came from,” I said.

Neri nodded. “It is one place you've been.”

Not the place I belonged. Not the place I had to return to. One place.

I asked for time alone.

Beyond the doorway, memory returned with a kind of terrible precision. I saw myself keeping lists for other people, making promises too quickly, laughing when I wanted to say no because laughing was easier than disappointing anyone. I remembered warmth too: a favorite book, rain on the windows, the thrill of building something that worked. My old life had not been entirely misery. That made the choice harder.

There were people I had loved, even if I couldn't yet recall their faces. There were obligations that belonged to me and others I had accepted because nobody asked whether I wanted them.

The door did not tell me which was which.

I sat on the floor and cried. Not because the room was terrible, but because it was familiar enough to hurt.

When I returned to the Lanternwell, Maui was waiting at a respectful distance. He had brought food and set it where I could reach it without having to explain myself.

“Did you remember?” he asked.

“Some of it.”

“Are you going back?”

“Maybe, someday. There are things I need to understand. People I may want to find. But I don't want to go back just because I know the way.”

He didn't try to tell me what to do.

“I was afraid you'd think I'd become somebody else,” I admitted.

His laugh was gentle. “Jasper, I'm a shapeshifter. I would be a spectacular hypocrite.”

“I'm serious.”

“So am I.” He crouched beside me. “I liked you when you couldn't tell me your name. I like you now that you can tell me when I'm being an idiot. I'm not measuring you against a stranger in a room I've never seen.”

I leaned against him.

“What if I find out I wasn't very brave?”

“Then we start with the brave thing you did today.”

“What was that?”

“You came back because you wanted to, not because I asked.”

The door behind us closed quietly. My key did not vanish. The choice would remain available.

That night I opened the notebook I'd begun in the bakery room. On one page I wrote the things I wanted to remember: the taste of bread, the sound of rain, the satisfaction of repairing a lantern, the way the sea changed color at dusk.

On the next page I wrote the things I wanted to learn: how to sail better, how to say no without an apology, how to return to an old place without becoming an old fear.

Maui looked over the list and pointed at the final blank line.

“Forgot one.”

“What?”

“How to win an argument with a demigod.”

I picked up my pencil.

“I thought I'd already mastered that.”

“Outrageous.”

I wrote it down anyway."""),
("Stormlight", """The storm came from two directions.

One was the ordinary sea, grey and furious beyond Tideglass Cove. The other blew through an unfinished Threadway, carrying rain that tasted of iron and sending sparks down the old lantern chain.

By the time the first bell rang, three houses near the shore had flooded.

Maui ran toward the water with his hook raised. I ran toward the square with the plans we'd drawn for the cove's drains.

We met halfway, both breathless, both angry.

“I can hold the waves,” he said.

“For how long?”

“As long as I have to.”

“And then what?”

He looked at the houses, and I saw the calculation behind his bravado. He could lift stones and alter the current for a while, but the opening would keep pulling more water through.

“I need help,” he said.

It was not loud. The storm nearly swallowed it.

“I have a plan,” I answered.

We worked side by side. Neri organized neighbors into teams to move people to higher ground. Maui shifted the largest fallen timbers out of the paths without leaving me alone at the breach. I climbed the stable side of the old bridge and called measurements back to him. Together we set the brass ring into its proper groove and secured it with a brace made from the very dock he had rebuilt for us.

The Threadway shuddered. The wind reversed. Water poured back toward the sea.

For one terrifying moment the brace began to bend.

Maui braced it with his hook. I locked the final catch.

The storm on the other side went silent.

We stood in the sudden ordinary rain, shaking.

“Did we do it?” I asked.

Maui looked down at the ring, then at me.

“We did.”

People emerged from the workshop shelter, counting one another and checking for injuries. There was damage everywhere: mud in the gardens, broken steps, a smashed boat. Nothing had been magically made whole by saving the village.

I helped Neri make a list of repairs. Maui carried the heavy pieces where they were needed. When someone began calling him the greatest hero in the valley, he shook his head.

“Don't forget the people who built the plan.”

He pointed to me, then to the others who had helped.

I almost protested out of habit.

Instead I said, “And don't forget who moved the beams.”

He grinned, relieved.

That evening, exhausted, we sat on the dry steps of the bakery. I rested my head against his shoulder and watched the lanterns come on one by one.

“I remembered something in the storm,” I said.

He waited.

“I used to think the only reason anyone needed me was that I could solve things.”

“That's not true.”

“I know.” I swallowed. “I know it now.”

He slipped an arm around me only after I leaned closer.

The storm had left work for tomorrow. We did not have to do all of it tonight.

And the people who would help us were already setting chairs around the square."""),
("The Person I Choose", """The first festival of the repaired Lanternweald began with a disagreement over how many lanterns a single square could safely hold.

Maui proposed a thousand.

Neri said fifty.

I negotiated seventy-five and the right to add more once Danse—some future traveler with a reputation for very serious inspections, according to one of Neri's prophetic jokes—came along to inspect the supports.

Maui pouted for nearly seven minutes.

Then he helped me hang the first string.

The square smelled of bread, rosemary, salt, and warm metal. Neighbors brought things they had made: bowls, painted signs, repaired stools, small books of remembered stories. I brought a lantern with a little brass key worked into its frame.

It was not the same key that had been tied to my wrist on the beach. That one still hung around my neck on blue thread.

This one I had made myself.

Maui examined the lantern as if it were a treasure.

“What's it for?”

“People who need a little time before deciding which door to open.”

He looked at me, expression uncharacteristically quiet.

“You made a light that doesn't tell anybody where to go.”

“Exactly.”

The bell beneath the Lanternwell rang at dusk. It sounded less like a summons than a greeting.

Five new Threadways glimmered at the edges of the vale. Through one came the smell of jasmine and rain. Through another, the rhythm of tools striking stone. A third held cold books and mountain air; a fourth carried the distant hum of machinery; a fifth offered the laughter of a boardwalk and a guitar somewhere beyond.

I didn't know the people waiting in those places. I didn't know which of them I would love, which would become friends, or which would ask me to think harder about who I wanted to be. The doors were invitations, not instructions.

Maui offered me his arm.

“Ready for the next great adventure?”

“In a minute.”

I took him to the repaired dock at Tideglass Cove. The sea was calm. The old canoe moved gently against the rope I'd tied, the same knot I'd struggled to learn on my first day.

“There's something I want to tell you,” I said.

Maui's shoulders went rigid in the manner of someone pretending not to be nervous.

“I remember enough of my old life to know it shaped me,” I said. “Some of it I want to keep. Some of it I need to understand. And some of it I want to leave behind. But I don't have to settle all of that before I'm allowed to be happy.”

He nodded, waiting.

“I love you,” I said.

His eyes widened.

Then, to my surprise, he laughed once and looked down at his hands.

“I've had crowds cheering my name,” he said. “I never knew what to do with someone saying that when nobody else is listening.”

“You could start by telling me what you feel.”

He drew a slow breath.

“I love you, Jasper. Not because you need saving. Not because I get to be the answer. Because you see me when I'm noisy, and when I'm scared, and when the hook isn't enough. And you stay when you want to.”

I took his hand. “We keep telling each other the truth if what we need changes?”

“Yes.”

“Even if it's difficult?”

He smiled. “Especially then.”

I kissed him beneath the lanterns and felt the quiet satisfaction of having asked my heart a question it was free to answer.

Later we returned to Lanternwell Square. Maui helped me put the new lantern above the common notice board. Beneath it I wrote a single line: YOU MAY BEGIN AGAIN WITHOUT ERASING WHAT CAME BEFORE.

I knew my name.

I knew I liked repairing things, making people laugh, drawing maps, asking difficult questions, and hearing the sea before sunrise. I knew I loved a loud, ridiculous demigod who was learning to let other people help him.

There would be more memories, more mistakes, more doors.

I wasn't finished becoming myself. I didn't want to be.

Maui reached for my hand as the festival music began.

“Dance?”

“With you?”

“Who else could survive my magnificence?”

“Probably nobody.”

We laughed and stepped into the warm, imperfect circle of light.

This time I wasn't following somebody else's map.

I was making my own.""")
]

def dump(path,obj):
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(json.dumps(obj,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")

def main():
    assert len(CHAPTERS)==10
    SERIES_FOLDER.mkdir(parents=True,exist_ok=True)
    metas=[]
    entries=[]
    for i,(title,content) in enumerate(CHAPTERS,1):
        assert len(content.split())>=450,(i,len(content.split()))
        chapter={
            "schema_version":"8.0", "work_type":"fanfic_chapter",
            "author":"William Saville", "dedication":"Written for Jasper",
            "date_written":"November 4, 2026",
            "fandom":"Moana-inspired fanfiction (Maui)",
            "pairing":"Maui / Jasper", "reader_character":"Jasper, adult first-person reader protagonist",
            "rating":"Teen",
            "content_notes":"Memory loss, non-graphic danger, emotional recovery, gradual non-explicit romance",
            "series_slug":SERIES_SLUG,"series_title":"The Shore I Choose",
            "title":title,"subtitle":f"The Shore I Choose · Chapter {i} of 10",
            "chapter_number":i,"word_count":len(content.split()),"content":content,
            "fandom_folder":"Disney","series_folder":"Maui-And-Jasper",
            "series_path":"Disney/Maui-And-Jasper",
            "id":f"maui-{i:02d}","format":"linear_first_person_reader_insert",
            "narrative_tense":"first_person_past",
            "shared_world":{"setting":"The Lanternweald","district":"Tideglass Cove",
                "threadway":"The Tideglass Door","continuity":"Origin story, precedes five existing stories"},
            "cultural_research_note":"See docs/MAUI_CULTURAL_NOTES.md; historical Māori forms distinguished from original fictional dance."
        }
        dump(SERIES_FOLDER/f"{i:02d}.json",chapter)
        metas.append({"number":i,"file":f"{i:02d}.json","title":title,"id":chapter["id"],
            "word_count":chapter["word_count"],
            "next_chapter_id":f"maui-{i+1:02d}" if i<10 else None})
        entries.append({k:chapter[k] for k in ("id","title","subtitle","chapter_number","content")})
    series={
        "schema_version":"8.0","work_type":"fanfiction_series",
        "fandom":"Moana-inspired fanfiction (Maui)","series_title":"The Shore I Choose",
        "series_slug":SERIES_SLUG,"series_folder":"Maui-And-Jasper",
        "series_path":"Disney/Maui-And-Jasper",
        "pairing":"Maui / Jasper","reader_character":"Jasper, adult first-person reader protagonist",
        "rating":"Teen",
        "description":"Before the other Threadways open, a memoryless Jasper meets Maui at Tideglass Cove and learns to choose a life rather than recover an assigned one.",
        "chapter_count":len(CHAPTERS),"total_word_count":sum(x["word_count"] for x in metas),
        "reading_order":"linear",
        "shared_world":{"name":"The Lanternweald","district":"Tideglass Cove","threadway":"The Tideglass Door"},
        "story_bible":[
            "Maui is proudly theatrical, funny, impulsive, clever and capable of compassion. His hero identity is a source of pressure and growth, not a license to control Jasper.",
            "Jasper's lost memories return as feelings, skills, and fragments. Their agency never depends on fully reconstructing their past.",
            "The romance is mutual, negotiated, emotionally honest and teen-rated. Consent is explicit when meaningful.",
            "Māori waiata, poi, whare tapere and haka are culturally distinct. No invented universal Māori courtship ritual is claimed."
        ],
        "chapters":metas
    }
    dump(SERIES_FOLDER/"series.json",series)

    datafile=ROOT/"js/fanfic-data.js"
    code=datafile.read_text(encoding="utf-8")
    marker="window.JASPER_FANFIC_DATA = "
    assert code.startswith(marker) and code.rstrip().endswith(";")
    payload=json.loads(code[len(marker):].strip()[:-1])
    assert len(payload["series"])==5 or (len(payload["series"])==6 and any(x["series_slug"]==SERIES_SLUG for x in payload["series"]))
    payload["series"]=[x for x in payload["series"] if x["series_slug"]!=SERIES_SLUG]
    payload["series"].insert(0,{
        "series_slug":SERIES_SLUG,
        "series_title":"The Shore I Choose",
        "fandom":"Moana-inspired fanfiction (Maui)",
        "rating":"Teen","description":series["description"],
        "shared_world":series["shared_world"],
        "chapters":entries
    })
    datafile.write_text(marker+json.dumps(payload,ensure_ascii=False,separators=(",",":"))+";\n",encoding="utf-8")

    indexfile=ROOT/"json/authored-library-index.json"
    idx=json.loads(indexfile.read_text(encoding="utf-8"))
    idx["series"]=[x for x in idx["series"] if x.get("key")!=SERIES_SLUG]
    idx["series"].insert(0,{
        "key":SERIES_SLUG,"title":series["series_title"],"fandom":series["fandom"],
        "pairing":series["pairing"],"rating":"Teen","chapter_count":10,
        "total_word_count":series["total_word_count"],
        "shared_world":series["shared_world"],
        "chapters":[{"id":x["id"],"chapter_number":x["number"],"title":x["title"],
                     "next_chapter_id":x["next_chapter_id"]} for x in metas]
    })
    dump(indexfile,idx)
    htmlfile=ROOT/"index.html"
    html=htmlfile.read_text(encoding="utf-8")
    html=html.replace("Five complete stories · 200 chapters · linear reading order",
                      "Six complete stories · 210 chapters · linear reading order")
    html=html.replace("Visit Jasmine Steps, Riverstone Terrace, Brasswatch Yard, Moonroot Archive, and Starwake Pier.",
                      "Begin at Tideglass Cove with Maui, then visit Jasmine Steps, Riverstone Terrace, Brasswatch Yard, Moonroot Archive, and Starwake Pier.")
    html=html.replace('content="A linear, teen-rated library of Jasper&#39;s completed fanfiction stories."',
                      'content="A connected, teen-rated library of Jasper fanfiction in the Lanternweald."')
    htmlfile.write_text(html,encoding="utf-8")

    cultural_notes="""# Maui and Jasper — cultural research notes

This is fiction inspired by a film character whose mythological namesake appears in **multiple distinct Polynesian traditions**. It does not claim to retell a single iwi's Māui narrative or to represent the whole Pacific as interchangeable. In Māori traditions, Māui is associated with stories such as fishing up Te Ika-a-Māui, among other exploits. See Te Ara: https://teara.govt.nz/en/first-peoples-in-maori-tradition and Te Papa: https://collections.tepapa.govt.nz/topic/3196.

**Māori song and performance are not a single courtship ritual.** Te Ara describes waiata aroha (love songs, often expressing longing or separation), ruri (amorous songs), haka in multiple ceremonial/social forms, and poi as a distinct performance tradition: https://teara.govt.nz/en/traditional-maori-songs-waiata-tawhito and https://teara.govt.nz/en/traditional-maori-songs-waiata-tawhito/page-3. Te Papa explains poi across music, health, storytelling, entertainment and other contexts: https://www.tepapa.govt.nz/digital-museum/explore-digital-museum/poi.

The whare tapere is described as a traditional social performance/recreation setting associated with arts, music and dance, including traditions of ancestors meeting and falling in love. See Te Ara: https://teara.govt.nz/en/traditional-maori-songs-waiata-tawhito/print and https://teara.govt.nz/en/leisure-in-traditional-maori-society-nga-mahi-a-te-rehia/page-4. Love and romance are also represented through narratives such as Hinemoa and Tūtānekai: https://teara.govt.nz/en/love-and-romance/page-1.

**Fictional adaptation in chapter 6:** Mereana is an invented Māori visiting artist who offers her group's own contemporary poi performance associated with a love-themed song. She explicitly distinguishes the performance from a claimed universal historical 'Māori courtship dance'. Maui and Jasper then have a personal dance of their own. No invented sacred words, chants, or restricted choreography are attributed to Māori culture. A culture-specific final edition would benefit from a Māori sensitivity reader.

Cultural research informs the context rather than functioning as proof that the fictional visiting artist or performance actually existed.
"""
    (ROOT/"docs/MAUI_CULTURAL_NOTES.md").write_text(cultural_notes,encoding="utf-8")

    world=ROOT/"docs/LANTERNWEALD_WORLD_BIBLE.md"
    text=world.read_text(encoding="utf-8")
    if "## First Lantern — origin chronology" not in text:
        text += """
## First Lantern — origin chronology
The Shore I Choose (10 chapters) is the first personal arc in Jasper's chronology: the tide, memory fragments, Maui, the Lanternwell, and the first five opening Threadways. Its final scene deliberately opens doors toward the established stories. The other stories remain separate but connected complete romances with their own boundaries; no future relationship silently rewrites a past one. The shared vale supports ongoing conversations about change, autonomy, and consent.
"""
        world.write_text(text,encoding="utf-8")
    (ROOT/"docs/STEP_4_MAUI_STORY.md").write_text(
        "# Step 4 — Maui and Jasper integrated\n\n"+
        "The Shore I Choose is a newly authored, complete ten-chapter linear novel. "+
        "It begins at Tideglass Cove before the first five story threads open. "+
        "Jasper's identity returns in fragments; Maui supports but does not decide their choices. "+
        "The plot includes maritime adventures, emotional growth, non-explicit romance, "+
        "and a culturally contextualized contemporary poi/love-song performance with source notes. "+
        "There are now six complete stories and 210 chapters in the offline site. "+
        "Original five stories and their 25 crossover bridges remain intact.\n",
        encoding="utf-8"
    )
    assert len(payload["series"])==6
    assert sum(len(x["chapters"]) for x in payload["series"])==210
    assert all(len(z["content"])>2500 for z in entries)
    print("Maui story integrated",len(entries),"chapters",series["total_word_count"],"words")

if __name__=="__main__":
    main()
