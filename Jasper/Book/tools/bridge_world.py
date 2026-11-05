#!/usr/bin/env python3
"""Step 3: Add Lanternweald continuity without overwriting existing story prose."""
from pathlib import Path
import json
import re
import textwrap

ROOT = Path(__file__).resolve().parents[1]
WORLD_NAME = "The Lanternweald"
PATHS = [
    ("HP/After-Always", "Moonroot Archive", "The Moonroot Door"),
    ("Avatar/Jasmine-After-Rain", "Jasmine Steps", "The Jasmine Door"),
    ("Avatar/Love-And-Duty", "Riverstone Terrace", "The Riverstone Door"),
    ("FO4/What-The-Armor-Leaves-Behind", "Brasswatch Yard", "The Brasswatch Door"),
    ("SU/Stars-Between-The-Strings", "Starwake Pier", "The Starwake Door"),
]

# These passages are added as literary bridge scenes, not alternate endings or story choices.
# The original chapter.content strings are preserved verbatim.
BRIDGES = {
"HP/After-Always": {
1: ("The west end of Lanternwell Square held a dark door set into a wall of living roots. It had no handle, only the shape of a keyhole under a pale moonflower. I had spent the morning helping Iroh carry seed trays across the square; he had called the door a reminder that some people need a place to return to before they can decide where they belong. When I touched the moonflower, the rootwork folded aside. Beyond it lay a stone corridor and the scent of old books, bitter herbs, and rain. Somewhere in that other world a man was still being punished for surviving. I took one step through, with no idea how thoroughly my own life was about to change.", None),
10: (None, "That night I returned briefly through the Moonroot Door with an unfinished list of potion ingredients and an argument I could not stop replaying. At Lanternwell Square, Iroh sat beside a warm kettle while Greg adjusted a string on his guitar. Neither insisted on being useful. Iroh only poured tea. Greg asked whether I wanted music or quiet, then accepted quiet without disappointment. The kindness did not resolve the argument waiting beyond the door. It did, however, remind me that the argument was not the whole of my life. I went back to the castle with steadier hands and a better question to ask."),
20: (None, "A door left open mattered differently after I had seen the Lanternweald. At Moonroot Archive, a little door opened onto a reading room of books volunteered by people from worlds that disagreed about nearly everything. I found Toph testing the walls with one bare foot while Greg tried to decide whether a record player counted as a scholarly instrument. I laughed, unexpectedly, and thought of Severus making room in ways that would never look generous to anyone who had not learned his language. I did not mistake the archive's openness for permission to demand it of him. Trust was not the absence of doors. It was the right to close them, and the choice to open them again."),
30: (None, "I took the day's frustration back to Moonroot Archive rather than carry it straight into another fight. A note lay beside the door in handwriting too elegant to belong to Greg: Iroh had left an invitation to the market's evening meal. Severus arrived an hour later, announced that a magical valley did not excuse imprecise labeling, and reorganized three shelves while pretending he had come only for a missing reference. I watched the archive's lamplight catch on his sleeve. Nobody asked him to become pleasant, redeemed, or easy. There was a chair waiting for him nevertheless. He stayed long enough for the soup to cool."),
40: (None, "At Lanternwell Square the next morning, Severus found his name written on the Moonroot Archive's volunteer board beneath the words 'consultation by appointment.' He stared at it for so long I thought he might hex the chalk. 'You presume a great deal,' he said. 'I brought the chalk,' I answered. 'That isn't the same thing.' Across the square Iroh was opening his tea stall and Danse was repairing a lantern bracket; a guitar carried from Starwake Pier. Severus looked toward the sounds, then took the chalk from my hand and corrected his hours. He did not surrender the life we had built elsewhere. He merely allowed it another place to grow.")
},
"Avatar/Jasmine-After-Rain": {
1: ("At the eastern edge of the Lanternweald, a narrow lane smelled of rain and jasmine even under a clear sky. Lanterns hung above its windows; one door bore the carved shape of a dragon curled around a teacup. The path beyond would lead to a real city with real histories, not a painted storybook imitation. I had only recently learned that the Lanternweald's thresholds opened onto places whose people could refuse to come back with me. I stepped through the Jasmine Door carrying my map, my stubbornness, and the mistaken belief that I knew where I was going.", None),
10: (None, "The night market in Ba Sing Se left its colors in my thoughts long after the lanterns were put away. Back at Jasmine Steps, I found Greg tuning a guitar beneath the little street's trellises. He asked about the city, but he asked more carefully about Iroh. 'Does he have anyone who checks on him?' he said. I started to give the obvious answer, that everyone loved Iroh, and stopped. Being loved by a city was not the same as being cared for by one person. I carried a paper-wrapped sweet back through the Jasmine Door, and this time I remembered to ask the tea seller whether he had eaten."),
20: (None, "I carried a cup of jasmine tea to the Lanternwell before sunrise and found the square occupied by a strange argument. Toph wanted the fountain's stonework rebuilt with fewer decorative cracks. Danse insisted every repair needed a structural inspection. Iroh listened with a delighted expression that made both of them suspicious. When he noticed me he held out a second cup, as if he had known exactly when I would arrive. 'There is more than one way to protect a home,' he told them. Toph snorted. Danse began taking notes. I sat with him while the square turned disagreement into something that might actually last."),
30: (None, "The shop kettle had hardly stopped steaming when a small brass bell rang from Jasmine Steps. Iroh and I crossed into the Lanternweald to find Severus standing beside the community garden, frowning at a plant label. 'This is not mountain mint,' he informed Iroh. 'It has been mislabeled.' I waited for offense. Instead Iroh looked closely at the leaves and asked for a lesson. By sunset, the two had produced a precise growing chart, an excellent pot of tea, and only one argument about whether measurements were a substitute for good judgment. Seeing Iroh learn without pretending to know everything made me love him in another, quieter way."),
40: (None, "The Jasmine Steps gained a tea stall the following spring. It was not a replacement for the Jasmine Dragon; the real shop waited beyond its door, complete with customers who knew exactly how their cups should be filled. Here, though, Iroh could sit with people who knew him without any need for legends. Greg arrived with his guitar, Katara with a basket of herbs, and Severus with a severe opinion about steeping times. Iroh set out more cups than he needed. He did not ask anyone to stay forever. When I reached for his hand beneath the counter, the square felt less like an escape than a place where the roads of several lives met.")
},
"Avatar/Love-And-Duty": {
1: ("Riverstone Terrace did not believe in tidy borders. The Lanternweald's cobbles gave way there to new bridges, mixed building styles, and a stone threshold that opened toward Cranefish Town. Aang had once paused by the doorway to study a mural of people repairing a roof together; Katara had asked who paid for the materials, and Toph had declared the entire foundation suspicious. I remembered their different questions when I entered the town for the first time. The place beyond the Riverstone Door was not a puzzle waiting for a savior. It was a community with its own decisions to make, and I would have to learn to listen.", None),
10: (None, "The Lanternweald's community notice board had become a source of entertainment. Greg proposed a free music night. Danse wrote three separate safety objections. Toph came by and rearranged the nails with her foot until the board stood straight. 'You know what the problem with rules is?' she asked. I offered several guesses. 'People writing them without checking the ground.' Aang laughed; Katara quietly asked who was responsible for keeping the walkway accessible. Nobody solved the town in one afternoon. Together we made a list of actual repairs, and I loved how each person took a different part of the same problem seriously."),
20: (None, "At Riverstone Terrace the next afternoon, Katara found the Lanternweald's public workshop crowded with people trying to decide how to distribute building supplies. Danse wanted a record of every piece of scrap; Greg wanted nobody turned away without a conversation. Katara listened to both and then asked the residents what they needed. Aang helped carry water. Toph inspected the footings and called three proposals 'beautifully stupid.' I watched Katara turn anger into organized care without surrendering either one. She caught my eye across the room and smiled, small and fierce. Our home could stretch across worlds, but it still had to be made in ordinary acts."),
30: (None, "A storm struck the Lanternweald while the four of us were carrying repairs home. Wind drove branches across Riverstone Terrace, and the Lanternwell's old lamps swung dangerously. Toph planted her feet and held the stone walkway steady; Katara diverted water away from the houses; Aang carried stranded neighbors over the flooded channel. I fetched blankets, opened the workshop, and made sure nobody was left behind. When the sky finally cleared, Danse arrived with a ladder and Iroh with steaming tea. No one had to be the single hero. That night we sat in the square, wet and exhausted, sharing a home that had become bigger than any one of our maps."),
40: (None, "Four bowls still stood on the table when we returned from Riverstone Terrace's market. Aang had invited the neighbors; Katara had organized the food; Toph claimed she had only come because the chairs were less terrible than last time. Then Iroh arrived carrying tea, and Greg followed with a song he promised was short. I looked around the Lanternwell and understood that a shared world did not make anyone's obligations disappear. It made a second place to practice them honestly. Aang squeezed my shoulder, Katara saved the last dumpling for me, and Toph announced that our table was taking up entirely too much space. She moved her chair closer.")
},
"FO4/What-The-Armor-Leaves-Behind": {
1: ("Brasswatch Yard stood on the Lanternweald's northern edge, where abandoned metal could become useful again. A round door built into the old pump house opened onto a world of ruined roads and stubborn survivors. The first time I looked through it, a cold wind carried dust and the faint rattle of machinery. I understood that the valley's gentle lamps would not protect me from mistakes on the other side. Still, something about the people working beyond that threshold drew me. I checked my pack, took my bearings, and crossed into the Commonwealth without expecting to meet a man who wore his armor as though it were the only thing holding him together.", None),
10: (None, "At Brasswatch Yard, I found the repair bench covered in pieces of a lantern mechanism. Greg had donated a coil of wire from an old amplifier; Toph had rejected a faulty bracket with the confidence of someone who could hear its lie in the metal. Danse studied the assembly for a long time before quietly showing us how to keep the current from overheating the housing. Nobody saluted him. Nobody demanded that he justify his usefulness by naming a rank. When the lantern lit, he seemed almost startled. I made no speeches about it. I handed him the next bracket and let him decide whether he wanted to stay."),
20: (None, "The public workshop's rules began with a debate about doors. Danse wanted secure storage; Katara wanted emergency access; I wanted a way for people to ask before being touched or treated as a problem. We argued until midnight, then built a set of shelves that could actually be reached by the people using them. When Danse caught me smiling, he narrowed his eyes. 'What?' 'You just asked three civilians what they thought before issuing an instruction.' He considered that. 'It was a consultation.' 'Of course it was.' He held my hand as we walked back toward the Brasswatch Door, and neither of us made it into a ceremony."),
30: (None, "I crossed into the Lanternweald with the taste of dust still in my mouth and found the Lanternwell shining after repairs. Iroh was serving tea to the volunteers; Severus had sent a bottle of something that removed rust without damaging old engravings. Danse inspected it, read the label twice, and asked who had certified the ingredients. I told him the author would welcome the question less than the precision. He went to the archive anyway. They disagreed for an hour and emerged with a safer procedure than either had started with. For the first time I saw him belong to a conversation that was not an order or a threat."),
40: (None, "In the Lanternweald, Danse built a little sign above the Brasswatch workshop. It named no rank, no order, and no former allegiance. Just REPAIRS, in letters he had measured twice. Greg helped hang it. Toph tested the support posts and declared them 'not embarrassing.' Iroh brought food. Danse watched our ridiculous collection of neighbors and finally took off his work gloves. 'This is a strange assignment,' he said. 'It's not an assignment,' I reminded him. He glanced at the door to the Commonwealth, then back at the square. 'I know.' His hand found mine, and he stayed to eat.")
},
"SU/Stars-Between-The-Strings": {
1: ("The western footpath of the Lanternweald reached a pier that smelled of salt even when no sea was visible beyond it. At Starwake Pier, seashell wind chimes hung beside a doorway painted with little stars. Music drifted through the threshold in snatches, as if the air were rehearsing a song it had not finished yet. I followed it toward a boardwalk in another world. The people there were living lives, not acting out a story for me, and I had learned not to assume any door opened for my benefit alone. Still, I was curious enough to step through and find out who was playing.", None),
10: (None, "Greg brought his guitar into the Lanternweald for the first time on an ordinary evening when nothing needed saving. Iroh offered tea, and Aang asked whether the song could be learned on a flute. Danse examined the instrument's wiring as if it might be a security problem. Greg laughed, settled on the edge of the Lanternwell, and played softly enough that conversation could continue around him. I realized how rare it was for Greg to perform without feeling he had to prove anything. When the song ended, nobody demanded another. I sat beside him in the comfortable silence that followed."),
20: (None, "The lanterns along Starwake Pier needed rewiring, which meant Greg and Danse spent an entire afternoon disagreeing about the best way to route a cable. I helped carry supplies. Toph announced that the supports were strong but the men's opinions were exhausting. Greg answered with a short improvisation about a heroic inspector of wooden posts; even Danse smiled before he could stop himself. Afterward, Greg asked whether I still liked the music when it came with mess and bad jokes. I told him the music was never the whole reason I came. He put his guitar aside and listened as though that answer mattered."),
30: (None, "At the Lanternwell's winter gathering, Greg played a song nobody had asked him to make perfect. Katara helped the children hang paper stars; Iroh kept the tea hot; Severus stood near the edge of the crowd and pretended not to recognize the melody by its second refrain. Greg caught me looking at him and waggled his eyebrows until I laughed. Later, when the square emptied, he admitted that being heard without needing to impress anyone still frightened him. We walked to Starwake Pier together. He did not fill the silence with another song. I was grateful he knew I could love the person who remained when the music stopped."),
40: (None, "By the next festival, Starwake Pier had become a place people crossed to hear one another. Greg played a set with room for mistakes, interruptions, and a very enthusiastic audience of one when Aang arrived with a borrowed flute. Iroh brought tea; Danse replaced a loose railing; Toph complained about the tempo while tapping her foot to it. Greg smiled at me over the strings, not asking whether he would be remembered forever. I walked beside him when the lights went out and helped fold the chairs. The Lanternweald was not the only home we had. It was the one where all those separate roads had begun to recognize each other.")
}
}

WORLD_BIBLE = """# The Lanternweald: Shared World Bible

## Original premise
The Lanternweald is a self-contained magical vale threaded between **real, continuing universes**. It is not a replica of a franchise village. At its heart stands the Lanternwell: a spring beneath old stone arches, where small hanging lights glow when someone has found a place they wish to return to.

The vale opens **Threadways**: consenting two-way thresholds connecting familiar places in different worlds. A Threadway cannot force anyone through, steal their memories, heal a wound without consent, undo consequences, or declare a person destined for a relationship. A visitor retains their history and may go home. Days do not line up precisely between homeworlds, but causal events cannot be reversed by crossing a door. No one gets to skip an apology by stepping through a threshold.

## Jasper's place
Jasper is a named adult first-person reader-insert, never a blank puppet or a chosen savior. Their curiosity, humor, boundaries and resourcefulness link the neighborhoods. A forgotten beginning at Tideglass Cove (the Maui story) comes *before* their visits to the five existing worlds in Jasper's personal chronology. Jasper eventually knows and claims their name, without being required to reclaim every expectation attached to it.

## Geography
- **Lanternwell Square:** neutral common ground, community meals, notice board, books, shared repairs, lantern festival.
- **Jasmine Steps / the Jasmine Door:** tea garden and Ba Sing Se; Uncle Iroh's connection to the Jasmine Dragon remains real.
- **Riverstone Terrace / the Riverstone Door:** public works and Cranefish Town; Aang, Katara and Toph retain their own responsibilities and political disagreements.
- **Moonroot Archive / the Moonroot Door:** library, difficult learning and the postwar wizarding world; Severus remains private, exacting and accountable.
- **Brasswatch Yard / the Brasswatch Door:** accessible repair workshop and the Commonwealth; Danse's Brotherhood past is never erased or magically excused.
- **Starwake Pier / the Starwake Door:** music and Beach City; Greg's grief, independence and family remain central.
- **Tideglass Cove / the Tideglass Door:** shore, navigation, Maui and Jasper's first memory fragments.

## How the series fit
Each original 40-chapter story continues in its established homeworld, with the **shared-world bridge scenes** before chapter 1 or after select chapters marking real visits to Lanternweald. These scenes are not alternate endings or choose-your-own-adventure routes; the chapter order stays linear. Every chapter's structured source file identifies its home district and world threshold. Characters may meet across stories at Lanternwell Square, while the individual plots still follow their original emotional stakes.

Crossovers never transform other characters into props. No relationship is erased and no romance is silently made exclusive or nonexclusive: consent, honest conversation, and the specific boundaries established within each story still govern those relationships. Lanternweald does not automatically grant intimacy.

## Everyday life and community conflicts
Residents maintain a shared garden, cook communal meals, mend lamps and roofs, run a lending library, share songs and stories, and disagree about the fair distribution of resources. Conflicts have consequences: a broken bridge needs repair even after a stirring speech. The vale is warm, adventurous and restful, but never a magic shortcut past responsibility.

## Continuity and language
- No lost-memory effect applies to anyone except Jasper at the beginning of the Maui story.
- A Threadway is a door to a *real place*, not an artificial copy of a person or a memory.
- Avoid reusing franchise worldbuilding terminology as the vale's own foundational lore.
- The five original chapter contents are preserved verbatim in Step 3; new scenes live in bridge fields and appear in the live reader.
- No branching decisions or interactive romance routes are introduced.
"""

def write_json(path, obj):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def apply():
    totals = {}
    built = []
    for series_path, district, doorway in PATHS:
        folder = ROOT / "json" / series_path
        series_file = folder / "series.json"
        series = json.loads(series_file.read_text(encoding="utf-8"))
        chapters = []
        for n in range(1, 41):
            file = folder / f"{n:02d}.json"
            chapter = json.loads(file.read_text(encoding="utf-8"))
            # The old narrative remains unaltered. The next stage can still edit it freely.
            chapter["shared_world"] = {
                "setting": WORLD_NAME,
                "district": district,
                "threadway": doorway,
                "continuity": "Linear story, real homeworld, optional voluntary crossings"
            }
            chapter["format"] = "linear_first_person_reader_insert"
            if n in BRIDGES[series_path]:
                before, after = BRIDGES[series_path][n]
                if before:
                    chapter["bridge_intro"] = before
                if after:
                    chapter["bridge_outro"] = after
            write_json(file, chapter)
            chapters.append({
                "id":chapter["id"], "title":chapter["title"],
                "subtitle":chapter.get("subtitle", ""),
                "chapter_number":n, "content":chapter["content"],
                "bridge_intro":chapter.get("bridge_intro", ""),
                "bridge_outro":chapter.get("bridge_outro", "")
            })
        series["shared_world"] = {"name":WORLD_NAME, "district":district, "threadway":doorway}
        series["reading_order"] = "linear"
        write_json(series_file, series)
        built.append({
            "series_slug":series["series_slug"],
            "series_title":series["series_title"],
            "fandom":series["fandom"],
            "rating":series["rating"],
            "description":series.get("description",""),
            "shared_world":series["shared_world"],
            "chapters":chapters
        })
        totals[series_path] = len(chapters)

    # Existing reader data is an offline generated view; canonical files are per-chapter JSON.
    payload = {"schema_version":"8.0", "world":WORLD_NAME, "series":built}
    (ROOT/"js/fanfic-data.js").write_text(
        "window.JASPER_FANFIC_DATA = " + json.dumps(payload,ensure_ascii=False,separators=(",",":")) + ";\n",
        encoding="utf-8"
    )

    idxfile = ROOT/"json/authored-library-index.json"
    idx = json.loads(idxfile.read_text(encoding="utf-8"))
    idx["shared_world"] = WORLD_NAME
    for item in idx["series"]:
        match = next((x for x in built if x["series_slug"]==item.get("key")), None)
        if match:
            item["shared_world"] = match["shared_world"]
    write_json(idxfile,idx)

    # Add the literary bridge fields to the existing reader without disturbing its navigation.
    appfile = ROOT/"js/app.js"
    app = appfile.read_text(encoding="utf-8")
    if "appendWorldBridge" not in app:
        function = """    function appendWorldBridge(kind, body) {
      if (!body) return;
      const section = document.createElement("section");
      section.className = "world-bridge";
      const heading = document.createElement("h3");
      heading.textContent = kind;
      section.appendChild(heading);
      String(body).split(/\\n\\s*\\n/).filter(Boolean).forEach(function (piece) {
        const p = document.createElement("p");
        p.textContent = piece.trim();
        section.appendChild(p);
      });
      chapterCopy.appendChild(section);
    }
"""
        anchor = '    String(chapter.content || "").split('
        assert anchor in app, "Could not locate chapter rendering code"
        app = app.replace(anchor, function +
            '    appendWorldBridge("Lanternweald · Before", chapter.bridge_intro);\n' + anchor,1)
        second_anchor='    const count = series.chapters.length;'
        assert second_anchor in app, "Could not locate chapter progress code"
        app=app.replace(second_anchor,
            '    appendWorldBridge("Lanternweald · After", chapter.bridge_outro);\n' + second_anchor,1)
    appfile.write_text(app,encoding="utf-8")

    htmlfile=ROOT/"index.html"
    html=htmlfile.read_text(encoding="utf-8")
    if "lanternweald-intro" not in html:
        panel = """    <section class="lanternweald-intro" aria-labelledby="world-title">
      <p class="eyebrow">A shared world, many true stories</p>
      <h2 id="world-title">Welcome to the Lanternweald</h2>
      <p>A magical vale where doorways lead to Ba Sing Se, Cranefish Town, the Commonwealth, the wizarding world, and Beach City. Jasper's journeys connect the neighborhoods without erasing anyone's own home or history.</p>
      <p>Visit Jasmine Steps, Riverstone Terrace, Brasswatch Yard, Moonroot Archive, and Starwake Pier. Each story still reads from its first chapter to its last; the Lanternweald interludes are extra scenes, never choices or alternate endings.</p>
    </section>

"""
        spot='    <section class="reader-controls"'
        assert spot in html, "Reader controls not found"
        html=html.replace(spot,panel+spot,1)
    htmlfile.write_text(html,encoding="utf-8")

    cssfile=ROOT/"css/book.css"
    css=cssfile.read_text(encoding="utf-8")
    if ".world-bridge" not in css:
        css += """
/* The Lanternweald connects completed prose without turning reading into a game. */
.lanternweald-intro { padding: 1.25rem 1.5rem; margin: 1.5rem 0; border: 1px solid rgba(199,161,104,.48); border-radius: 1rem; background: rgba(80,65,57,.17); }
.lanternweald-intro h2 { margin-top: .3rem; }
.lanternweald-intro p { max-width: 75ch; }
.world-bridge { margin: 1.6rem 0; padding: 1.25rem 1.45rem; border-left: 3px solid #b18e60; background: rgba(114,83,63,.12); border-radius: .4rem; }
.world-bridge h3 { font-size: .94rem; letter-spacing: .065em; text-transform: uppercase; margin: 0 0 .9rem; }
.world-bridge p { margin: .7rem 0; line-height: 1.7; }
"""
    cssfile.write_text(css,encoding="utf-8")

    biblefile=ROOT/"docs/STORY_BIBLE.md"
    biblefile.write_text("""# Jasper Reader and Story Bible

Jasper is an adult, named, first-person reader-insert protagonist. Narration uses I/me/my/mine/myself. Jasper is observant, tender, witty, stubborn, and has a right to their own boundaries. Never replace them with a blank choice menu.

## Connected stories
- After Always: Severus Snape retains his difficult postwar history, precision, privacy, accountability, and dry humor.
- Jasmine After Rain: original-series Uncle Iroh retains his tea, Pai Sho, grief for Lu Ten, strategic intelligence, compassion, and joy.
- Love & Duty: the adult Aang, Katara, Toph and Jasper relationship preserves its consensual dynamics, public obligations, political conflict, and lived repair.
- What the Armor Leaves Behind: Danse's rank, Brotherhood past and moral struggle remain consequential; a magical door cannot erase them.
- Stars Between the Strings: Greg's music, grief, Beach City ties, family, and ability to choose love remain his own.

The Lanternweald connects their settings via voluntary Threadways, not parallel branching romances. Relationship boundaries and consent remain particular to each story; no crossover presumes access to another character.

## Rating and craft
Teen-rated, non-graphic intimacy, consent and natural privacy transitions. No adult content generator, branching story outcome, private scene stub, or choose-your-own-adventure mechanics. The reader offers fixed chapters with ordinary Next/Previous navigation.

See LANTERNWEALD_WORLD_BIBLE.md for geography, magic limits, and cross-fandom continuity.
""", encoding="utf-8")
    (ROOT/"docs/LANTERNWEALD_WORLD_BIBLE.md").write_text(WORLD_BIBLE,encoding="utf-8")
    write_json(ROOT/"json/lanternweald-map.json",{
        "name":WORLD_NAME, "hub":"Lanternwell Square", "threadways":[
            {"district":district,"door":doorway,"series_path":series_path}
            for series_path,district,doorway in PATHS
        ] + [{"district":"Tideglass Cove","door":"The Tideglass Door",
              "series_path":"Disney/Maui-And-Jasper"}],
        "access":"voluntary", "causality":"no resetting events or history",
        "memory_rule":"Jasper initially experiences amnesia; others retain their memories"
    })
    (ROOT/"docs/STEP_3_INTEGRATION.md").write_text(
        "# Step 3 — Lanternweald integrated\n\n"+
        "The original prose in all 200 existing chapters was preserved exactly. "+
        "All 200 source chapter files now include Lanternweald location metadata. "+
        "Twenty-five authored literary bridge scenes (five in each existing story) "+
        "are embedded as distinct prelude/postlude fields and displayed in the live reader. "+
        "All five stories are navigable in their original linear chapter order. "+
        "The source-of-truth chapter JSON and offline fanfic-data.js were regenerated together. "+
        "Continuity map and world bible added. No branches or alternate endings were introduced.\n",
        encoding="utf-8"
    )
    # Validate before any Git commit happens.
    assert sum(totals.values())==200
    assert len(built)==5 and all(len(s["chapters"])==40 for s in built)
    assert sum(bool(c.get("bridge_intro"))+bool(c.get("bridge_outro"))
               for s in built for c in s["chapters"])==25
    assert len((ROOT/"js/fanfic-data.js").read_bytes())>1000000
    print("Lanternweald integration validated:",totals)

if __name__ == "__main__":
    apply()
