'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from '../styles/Game.module.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the Font Awesome styles
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import axios from 'axios';

config.autoAddCss = false; // Prevent Font Awesome from adding its CSS since we are doing it manually

const wordList = [
  { word: 'aberrant', meaning: 'Markedly different from an accepted norm (adj)' },
  { word: 'abeyance', meaning: 'Temporary cessation or suspension (n)' },
  { word: 'abscond', meaning: 'Run away, often taking something or somebody along (v)' },
  { word: 'abstemious', meaning: 'Marked by temperance in indulgence (adj)' },
  { word: 'abstruse', meaning: 'Difficult to understand (adj)' },
  { word: 'absurd', meaning: 'Inconsistent with reason or logic or common sense (adj)' },
  { word: 'abyss', meaning: 'A bottomless gulf or pit (n)' },
  { word: 'acquiesce', meaning: 'Agree or express agreement (v)' },
  { word: 'adamant', meaning: 'Very hard native crystalline carbon valued as a gem (adj)' },
  { word: 'adept', meaning: 'Having or showing knowledge and skill and aptitude (adj)' },
  { word: 'admonish', meaning: 'Scold or reprimand; take to task (v)' },
  { word: 'adulate', meaning: 'Flatter in an obsequious manner (v)' },
  { word: 'adulation', meaning: 'Exaggerated flattery or praise (n)' },
  { word: 'adulterate', meaning: 'Make impure by adding a foreign or inferior substance (v)' },
  { word: 'adumbrate', meaning: 'Describe roughly or give the main points or summary of (v)' },
  { word: 'adverse', meaning: 'In an opposing direction (adj)' },
  { word: 'aesthete', meaning: 'One who professes great sensitivity to the beauty of art (n)' },
  { word: 'affable', meaning: 'Diffusing warmth and friendliness (adj)' },
  { word: 'affliction', meaning: 'A cause of great suffering and distress (n)' },
  { word: 'affluent', meaning: 'Having an abundant supply of money or possessions of value (adj)' },
  { word: 'aggrandize', meaning: 'Embellish; increase the scope, power, or importance of (v)' },
  { word: 'agitate', meaning: 'Move or cause to move back and forth (v)' },
  { word: 'agog', meaning: 'Highly excited (adj)' },
  { word: 'alacrity', meaning: 'Liveliness and eagerness (n)' },
  { word: 'allegation', meaning: 'A formal accusation against somebody (n)' },
  { word: 'allegiance', meaning: 'The act of binding yourself to a course of action (n)' },
  { word: 'ally', meaning: 'A friendly nation (n)' },
  { word: 'amalgamate', meaning: 'Bring or combine together or with something else (v)' },
  { word: 'ambiguous', meaning: 'Having more than one possible meaning (adj)' },
  { word: 'ambivalent', meaning: 'Uncertain or unable to decide about what course to follow (adj)' },
  { word: 'ambrosial', meaning: 'Worthy of the gods (adj)' },
  { word: 'ameliorate', meaning: 'Make better (v)' },
  { word: 'amenable', meaning: 'Disposed or willing to comply (adj)' },
  { word: 'anachronism', meaning: 'Locating something at a time when it couldn\'t have existed (n)' },
  { word: 'analgesic', meaning: 'Capable of relieving pain (adj)' },
  { word: 'annex', meaning: 'Attach to (v)' },
  { word: 'annotate', meaning: 'Add explanatory notes to or supply with critical comments (v)' },
  { word: 'annul', meaning: 'Cancel officially (v)' },
  { word: 'anomalous', meaning: 'Deviating from the general or common order or type (adj)' },
  { word: 'antediluvian', meaning: 'Of or relating to the period before the biblical flood (adj)' },
  { word: 'antipathy', meaning: 'A feeling of intense dislike (n)' },
  { word: 'antiseptic', meaning: 'Thoroughly clean and free of disease-causing organisms (adj)' },
  { word: 'aphoristic', meaning: 'Terse and witty and like a maxim (adj)' },
  { word: 'apocryphal', meaning: 'Being of questionable authenticity (adj)' },
  { word: 'apparition', meaning: 'A ghostly appearing figure (n)' },
  { word: 'appraise', meaning: 'Consider in a comprehensive way (v)' },
  { word: 'apprehension', meaning: 'Fearful expectation or anticipation (n)' },
  { word: 'apprise', meaning: 'Inform somebody of something (v)' },
  { word: 'approbation', meaning: 'Official acceptance or agreement (n)' },
  { word: 'aptitude', meaning: 'Inherent ability (n)' },
  { word: 'aqueous', meaning: 'Similar to or containing or dissolved in water (adj)' },
  { word: 'arable', meaning: 'Capable of being farmed productively (adj)' },
  { word: 'arbitrate', meaning: 'Act between parties with a view to reconciling differences (v)' },
  { word: 'arduous', meaning: 'Characterized by effort to the point of exhaustion (adj)' },
  { word: 'articulate', meaning: 'Express or state clearly (v)' },
  { word: 'ascetic', meaning: 'Someone who practices self denial as a spiritual discipline (n)' },
  { word: 'ascribe', meaning: 'Attribute or credit to (v)' },
  { word: 'asperity', meaning: 'Harshness of manner (n)' },
  { word: 'aspersion', meaning: 'A disparaging remark (n)' },
  { word: 'aspiration', meaning: 'A cherished desire (n)' },
  { word: 'assess', meaning: 'Estimate the nature, quality, ability or significance of (v)' },
  { word: 'assuage', meaning: 'Provide physical relief, as from pain (v)' },
  { word: 'astringent', meaning: 'Tending to draw together or constrict soft organic tissue (adj)' },
  { word: 'astute', meaning: 'Marked by practical hardheaded intelligence (adj)' },
  { word: 'atone', meaning: 'Turn away from sin or do penitence (v)' },
  { word: 'atrophy', meaning: 'A decrease in size of an organ caused by disease or disuse (v)' },
  { word: 'attentive', meaning: 'Taking heed (adj)' },
  { word: 'attenuate', meaning: 'Become weaker, in strength, value, or magnitude (v)' },
  { word: 'audacious', meaning: 'Disposed to venture or take risks (adj)' },
  { word: 'augment', meaning: 'Enlarge or increase (v)' },
  { word: 'auspicious', meaning: 'Indicating favorable circumstances and good luck (adj)' },
  { word: 'austere', meaning: 'Of a stern or strict bearing or demeanor (adj)' },
  { word: 'avarice', meaning: 'Reprehensible acquisitiveness; insatiable desire for wealth (n)' },
  { word: 'aver', meaning: 'Declare or affirm solemnly and formally as true (v)' },
  { word: 'averse', meaning: 'Strongly opposed (adj)' },
  { word: 'avert', meaning: 'Turn away or aside (v)' },
  { word: 'avid', meaning: 'Marked by active interest and enthusiasm (adj)' },
  { word: 'baleful', meaning: 'Threatening or foreshadowing evil or tragic developments (adj)' },
  { word: 'balk', meaning: 'Refuse to proceed or comply (v)' },
  { word: 'banal', meaning: 'Repeated too often; overfamiliar through overuse (adj)' },
  { word: 'baneful', meaning: 'Evil or sinister (adj)' },
  { word: 'banter', meaning: 'Light teasing repartee (n)' },
  { word: 'barefaced', meaning: 'With no effort to conceal (adj)' },
  { word: 'bask', meaning: 'Expose oneself to warmth and light, as for relaxation (v)' },
  { word: 'belie', meaning: 'Be in contradiction with (v)' },
  { word: 'bellicose', meaning: 'Having or showing a ready disposition to fight (adj)' },
  { word: 'benevolent', meaning: 'Showing or motivated by sympathy and understanding (adj)' },
  { word: 'benign', meaning: 'Kind in disposition or manner (adj)' },
  { word: 'bilk', meaning: 'Cheat somebody out of what is due, especially money (v)' },
  { word: 'bizarre', meaning: 'Conspicuously or grossly unconventional or unusual (adj)' },
  { word: 'blandishment', meaning: 'Flattery intended to persuade (n)' },
  { word: 'bleak', meaning: 'Unpleasantly cold and damp (adj)' },
  { word: 'blithe', meaning: 'Carefree and happy and lighthearted (adj)' },
  { word: 'blunder', meaning: 'An embarrassing mistake (n)' },
  { word: 'board', meaning: 'A stout length of sawn timber (n)' },
  { word: 'bog', meaning: 'Wet spongy ground of decomposing vegetation (n)' },
  { word: 'bogus', meaning: 'Fraudulent; having a misleading appearance (adj)' },
  { word: 'bolster', meaning: 'Support and strengthen (v)' },
  { word: 'bombast', meaning: 'Pompous or pretentious talk or writing (n)' },
  { word: 'boor', meaning: 'A crude uncouth ill-bred person lacking refinement (n)' },
  { word: 'breach', meaning: 'An opening, especially a gap in a dike or fortification (n)' },
  { word: 'brisk', meaning: 'Quick and energetic (adj)' },
  { word: 'brittle', meaning: 'Having little elasticity (adj)' },
  { word: 'brood', meaning: 'Hang over, as of something threatening, dark, or menacing (v)' },
  { word: 'burgeon', meaning: 'Grow and flourish (v)' },
  { word: 'burlesque', meaning: 'A theatrical entertainment of broad and earthy humor (n)' },
  { word: 'buttress', meaning: 'A support usually of stone or brick (n)' },
  { word: 'cadge', meaning: 'Obtain or seek to obtain by wheedling (v)' },
  { word: 'cajole', meaning: 'Influence or urge by gentle urging, caressing, or flattering (v)' },
  { word: 'calisthenics', meaning: 'Light exercises designed to promote general fitness (n)' },
  { word: 'cant', meaning: 'A slope in the turn of a road or track (n)' },
  { word: 'caprice', meaning: 'A sudden desire (n)' },
  { word: 'captor', meaning: 'A person who entraps and holds someone else (n)' },
  { word: 'castigate', meaning: 'Inflict severe punishment on (v)' },
  { word: 'catalyst', meaning: 'Substance that initiates or accelerates a chemical reaction (n)' },
  { word: 'caustic', meaning: 'Capable of destroying or eating away by chemical action (adj)' },
  { word: 'cavern', meaning: 'A large cave or a large chamber in a cave (n)' },
  { word: 'censor', meaning: 'A person authorized to suppress unacceptable material (n)' },
  { word: 'censure', meaning: 'Harsh criticism or disapproval (n)' },
  { word: 'cessation', meaning: 'A stopping (n)' },
  { word: 'charter', meaning: 'A document creating an institution and specifying its rights (n)' },
  { word: 'chary', meaning: 'Characterized by great caution (adj)' },
  { word: 'chicanery', meaning: 'The use of tricks to deceive someone (n)' },
  { word: 'circumlocution', meaning: 'An indirect way of expressing something (n)' },
  { word: 'circumspect', meaning: 'Careful to consider potential consequences and avoid risk (adj)' },
  { word: 'claim', meaning: 'Assert or affirm strongly (v)' },
  { word: 'clot', meaning: 'A lump of material formed from the content of a liquid (n)' },
  { word: 'clumsy', meaning: 'Lacking grace in movement or posture (adj)' },
  { word: 'coagulant', meaning: 'An agent that produces coagulation (n)' },
  { word: 'coerce', meaning: 'Cause to do through pressure or necessity (v)' },
  { word: 'cogent', meaning: 'Powerfully persuasive (adj)' },
  { word: 'cognizance', meaning: 'The state or act of having knowledge of (n)' },
  { word: 'coherent', meaning: 'Marked by an orderly and consistent relation of parts (adj)' },
  { word: 'collusion', meaning: 'Secret agreement (n)' },
  { word: 'commensurate', meaning: 'Corresponding in size or degree or extent (adj)' },
  { word: 'commentator', meaning: 'An expert who observes and remarks on something (n)' },
  { word: 'complacent', meaning: 'Contented to a fault with oneself or one\'s actions (adj)' },
  { word: 'complaisant', meaning: 'Showing a cheerful willingness to do favors for others (adj)' },
  { word: 'composure', meaning: 'Steadiness of mind under stress (n)' },
  { word: 'concede', meaning: 'Give over (v)' },
  { word: 'conceit', meaning: 'The trait of being unduly vain (n)' },
  { word: 'concession', meaning: 'The act of yielding (n)' },
  { word: 'conciliatory', meaning: 'Making or willing to make concessions (adj)' },
  { word: 'concoct', meaning: 'Make something by mixing (v)' },
  { word: 'concur', meaning: 'Happen simultaneously (v)' },
  { word: 'condescend', meaning: 'Behave in a patronizing manner (v)' },
  { word: 'conducive', meaning: 'Tending to bring about; being partly responsible for (adj)' },
  { word: 'confidential', meaning: 'Given in secret (adj)' },
  { word: 'confine', meaning: 'Place limits on (v)' },
  { word: 'conflagration', meaning: 'A very intense and uncontrolled fire (n)' },
  { word: 'conflate', meaning: 'Mix together different elements (v)' },
  { word: 'confound', meaning: 'Be confusing or perplexing to (v)' },
  { word: 'confrontation', meaning: 'Discord resulting from a clash of ideas or opinions (n)' },
  { word: 'congruent', meaning: 'Corresponding in character or kind (adj)' },
  { word: 'conifer', meaning: 'A type of tree or shrub bearing cones (n)' },
  { word: 'conjecture', meaning: 'Believe especially on uncertain or tentative grounds (v)' },
  { word: 'conjure', meaning: 'Summon into action or bring into existence (v)' },
  { word: 'conscript', meaning: 'Enroll into service compulsorily (v)' },
  { word: 'consensus', meaning: 'Agreement in the judgment reached by a group as a whole (n)' },
  { word: 'consign', meaning: 'Give over to another for care or safekeeping (v)' },
  { word: 'console', meaning: 'Give moral or emotional strength to (v)' },
  { word: 'conspicuous', meaning: 'Obvious to the eye or mind (adj)' },
  { word: 'conspire', meaning: 'Act in agreement and in secret towards a deceitful purpose (v)' },
  { word: 'consternation', meaning: 'Sudden shock or dismay that causes confusion (n)' },
  { word: 'contend', meaning: 'Compete for something (v)' },
  { word: 'contentious', meaning: 'Showing an inclination to disagree (adj)' },
  { word: 'contingent', meaning: 'Determined by conditions or circumstances that follow (adj)' },
  { word: 'contrite', meaning: 'Feeling or expressing pain or sorrow (adj)' },
  { word: 'controversial', meaning: 'Marked by or capable of causing disagreement (adj)' },
  { word: 'convoke', meaning: 'Call together (v)' },
  { word: 'convoluted', meaning: 'Highly complex or intricate (adj)' },
  { word: 'corporal', meaning: 'Affecting the body as opposed to the mind or spirit (adj)' },
  { word: 'corroborate', meaning: 'Give evidence for (v)' },
  { word: 'covert', meaning: 'Secret or hidden (adj)' },
  { word: 'covet', meaning: 'Wish, long, or crave for (v)' },
  { word: 'cower', meaning: 'Crouch or curl up (v)' },
  { word: 'coy', meaning: 'Affectedly shy especially in a playful or provocative way (adj)' },
  { word: 'crave', meaning: 'Have an appetite or great desire for (v)' },
  { word: 'craven', meaning: 'Lacking even the rudiments of courage; abjectly fearful (adj)' },
  { word: 'crease', meaning: 'An angular indentation made by folding (n)' },
  { word: 'credulity', meaning: 'Tendency to believe readily (n)' },
  { word: 'crockery', meaning: 'Ceramic dishes used for serving food (n)' },
  { word: 'culpable', meaning: 'Deserving blame or censure as being wrong or injurious (adj)' },
  { word: 'curb', meaning: 'The act of restraining power or action or limiting excess (n)' },
  { word: 'dabble', meaning: 'Bob under so as to feed off the bottom of a body of water (v)' },
  { word: 'dampen', meaning: 'Lessen in force or effect (v)' },
  { word: 'dangle', meaning: 'Hang freely (v)' },
  { word: 'dazzle', meaning: 'Cause to lose clear vision, especially from intense light (v)' },
  { word: 'dearth', meaning: 'An insufficient quantity or number (n)' },
  { word: 'debacle', meaning: 'A sudden and complete disaster (n)' },
  { word: 'debilitate', meaning: 'Make weak (v)' },
  { word: 'decorous', meaning: 'Characterized by propriety and dignity and good taste (adj)' },
  { word: 'decorum', meaning: 'Propriety in manners and conduct (n)' },
  { word: 'decree', meaning: 'A legally binding command or decision (n)' },
  { word: 'decry', meaning: 'Express strong disapproval of (v)' },
  { word: 'dedication', meaning: 'Complete and wholehearted fidelity (n)' },
  { word: 'defer', meaning: 'Yield to another\'s wish or opinion (v)' },
  { word: 'deference', meaning: 'Courteous regard for people\'s feelings (n)' },
  { word: 'defiance', meaning: 'A hostile challenge (n)' },
  { word: 'defiant', meaning: 'Boldly resisting authority or an opposing force (adj)' },
  { word: 'deft', meaning: 'Skillful in physical movements; especially of the hands (adj)' },
  { word: 'delineate', meaning: 'Represented accurately or precisely (v)' },
  { word: 'deluge', meaning: 'A heavy rain (n)' },
  { word: 'demote', meaning: 'Assign to a lower position; reduce in rank (v)' },
  { word: 'demur', meaning: 'Politely refuse or take exception to (v)' },
  { word: 'denounce', meaning: 'Speak out against (v)' },
  { word: 'denunciation', meaning: 'A public act of condemnation (n)' },
  { word: 'deposition', meaning: 'The act of putting something somewhere (n)' },
  { word: 'deprivation', meaning: 'The disadvantage that results from losing something (n)' },
  { word: 'deprive', meaning: 'Take away (v)' },
  { word: 'descry', meaning: 'Catch sight of (v)' },
  { word: 'desiccate', meaning: 'Lacking vitality or spirit; lifeless (v)' },
  { word: 'desperate', meaning: 'A person who is frightened and in need of help (adj)' },
  { word: 'despicable', meaning: 'Morally reprehensible (adj)' },
  { word: 'detached', meaning: 'No longer connected or joined (adj)' },
  { word: 'deter', meaning: 'Turn away from as by fear or persuasion (v)' },
  { word: 'devoid', meaning: 'Completely wanting or lacking (adj)' },
  { word: 'diatribe', meaning: 'Thunderous verbal attack (n)' },
  { word: 'dichotomy', meaning: 'A classification into two opposed parts or subclasses (n)' },
  { word: 'diffident', meaning: 'Showing modest reserve (adj)' },
  { word: 'digress', meaning: 'Wander from a direct or straight course (v)' },
  { word: 'dilettante', meaning: 'An amateur engaging in an activity without serious intention (n)' },
  { word: 'diligent', meaning: 'Quietly and steadily persevering in detail or exactness (adj)' },
  { word: 'din', meaning: 'A loud, harsh, or strident noise (n)' },
  { word: 'dirge', meaning: 'A song or hymn of mourning as a memorial to a dead person (n)' },
  { word: 'disabuse', meaning: 'Free somebody from an erroneous belief (v)' },
  { word: 'disassemble', meaning: 'Take apart (v)' },
  { word: 'disburse', meaning: 'Expend, as from a fund (v)' },
  { word: 'discomfit', meaning: 'Cause to lose one\'s composure (v)' },
  { word: 'discourse', meaning: 'An extended communication dealing with some particular topic (n)' },
  { word: 'discreet', meaning: 'Marked by prudence or modesty and wise self-restraint (adj)' },
  { word: 'discrete', meaning: 'Constituting a separate entity or part (adj)' },
  { word: 'disdain', meaning: 'Lack of respect accompanied by a feeling of intense dislike (n)' },
  { word: 'disguise', meaning: 'Any attire that conceals the wearer\'s identity (n)' },
  { word: 'disinterested', meaning: 'Unaffected by concern for one\'s own welfare (adj)' },
  { word: 'dislodge', meaning: 'Remove or force from a position previously occupied (v)' },
  { word: 'disparate', meaning: 'Fundamentally different or distinct in quality or kind (adj)' },
  { word: 'disparity', meaning: 'Inequality or difference in some respect (n)' },
  { word: 'dispassionate', meaning: 'Unaffected by strong emotion or prejudice (adj)' },
  { word: 'dispel', meaning: 'Cause to separate and go in different directions (v)' },
  { word: 'disprove', meaning: 'Show to be false (v)' },
  { word: 'disrobe', meaning: 'Get undressed (v)' },
  { word: 'dissemble', meaning: 'Behave unnaturally or affectedly (v)' },
  { word: 'dissent', meaning: 'A difference of opinion (n)' },
  { word: 'distend', meaning: 'Cause to expand as if by internal pressure (v)' },
  { word: 'distract', meaning: 'Draw someone\'s attention away from something (v)' },
  { word: 'distraught', meaning: 'Deeply agitated especially from emotion (adj)' },
  { word: 'divest', meaning: 'Take away possessions from someone (v)' },
  { word: 'divulge', meaning: 'Make known to the public information previously kept secret (v)' },
  { word: 'docile', meaning: 'Easily handled or managed (adj)' },
  { word: 'dogmatic', meaning: 'Pertaining to a code of beliefs accepted as authoritative (adj)' },
  { word: 'doleful', meaning: 'Filled with or evoking sadness (adj)' },
  { word: 'dormant', meaning: 'Inactive but capable of becoming active (adj)' },
  { word: 'drab', meaning: 'A dull greyish to yellowish or light olive brown (adj)' },
  { word: 'drawl', meaning: 'A slow speech pattern with prolonged vowels (v)' },
  { word: 'droll', meaning: 'Comical in an odd or whimsical manner (adj)' },
  { word: 'drone', meaning: 'Make a monotonous low dull sound (v)' },
  { word: 'drought', meaning: 'A shortage of rainfall (n)' },
  { word: 'dubious', meaning: 'Fraught with uncertainty or doubt (adj)' },
  { word: 'dumbfound', meaning: 'Be a mystery or bewildering to (v)' },
  { word: 'dupe', meaning: 'Fool or hoax (v)' },
  { word: 'dwarf', meaning: 'A person who is markedly small (n)' },
  { word: 'dwindle', meaning: 'Become smaller or lose substance (v)' },
  { word: 'ebullient', meaning: 'Joyously unrestrained (adj)' },
  { word: 'eclectic', meaning: 'Selecting what seems best of various styles or ideas (adj)' },
  { word: 'efface', meaning: 'Remove by or as if by rubbing or erasing (v)' },
  { word: 'efficacious', meaning: 'Giving the power to produce an intended result (adj)' },
  { word: 'effrontery', meaning: 'Audacious behavior that you have no right to (n)' },
  { word: 'egalitarian', meaning: 'Favoring social equality (adj)' },
  { word: 'egregious', meaning: 'Conspicuously and outrageously bad or reprehensible (adj)' },
  { word: 'elicit', meaning: 'Call forth, as an emotion, feeling, or response (v)' },
  { word: 'eloquence', meaning: 'Powerful and effective language (n)' },
  { word: 'elucidate', meaning: 'Make clear and comprehensible (v)' },
  { word: 'elusive', meaning: 'Skillful at evading capture (adj)' },
  { word: 'embellish', meaning: 'Make more attractive, as by adding ornament or color (v)' },
  { word: 'embrace', meaning: 'Squeeze tightly in your arms, usually with fondness (v)' },
  { word: 'emissary', meaning: 'Someone sent to represent another\'s interests (n)' },
  { word: 'emollient', meaning: 'A substance with a soothing effect when applied to the skin (n)' },
  { word: 'enchant', meaning: 'Cast a spell over someone or something (v)' },
  { word: 'encomium', meaning: 'A formal expression of praise (n)' },
  { word: 'encroach', meaning: 'Advance beyond the usual limit (v)' },
  { word: 'encumber', meaning: 'Hold back, impede, or weigh down (v)' },
  { word: 'endeavor', meaning: 'Attempt by employing effort (v)' },
  { word: 'endorse', meaning: 'Approve of (v)' },
  { word: 'enervate', meaning: 'Weaken physically, mentally, or morally (v)' },
  { word: 'engender', meaning: 'Call forth (v)' },
  { word: 'engrossed', meaning: 'Giving or marked by complete attention to (adj)' },
  { word: 'enigma', meaning: 'Something that baffles understanding and cannot be explained (n)' },
  { word: 'enlist', meaning: 'Join the military (v)' },
  { word: 'ensign', meaning: 'A person who holds a commissioned rank in the U.S. Navy (n)' },
  { word: 'enthral', meaning: 'Hold spellbound (v)' },
  { word: 'entrenched', meaning: 'Dug in (adj)' },
  { word: 'ephemeral', meaning: 'Anything short-lived, as an insect that lives only for a day (adj)' },
  { word: 'epistemology', meaning: 'The philosophical theory of knowledge (n)' },
  { word: 'epistle', meaning: 'A specially long, formal letter (n)' },
  { word: 'epithet', meaning: 'Descriptive word or phrase (n)' },
  { word: 'epitome', meaning: 'A standard or typical example (n)' },
  { word: 'equivocate', meaning: 'Be deliberately ambiguous or unclear (v)' },
  { word: 'equivocation', meaning: 'Intentional vagueness or ambiguity (n)' },
  { word: 'eradicate', meaning: 'Destroy completely, as if down to the roots (v)' },
  { word: 'erratic', meaning: 'Liable to sudden unpredictable change (adj)' },
  { word: 'erudite', meaning: 'Having or showing profound knowledge (adj)' },
  { word: 'eschew', meaning: 'Avoid and stay away from deliberately (v)' },
  { word: 'esoteric', meaning: 'Understandable only by an enlightened inner circle (adj)' },
  { word: 'espouse', meaning: 'Choose and follow a theory, idea, policy, etc. (v)' },
  { word: 'espy', meaning: 'Catch sight of (v)' },
  { word: 'ethos', meaning: 'The distinctive spirit of a culture or an era (n)' },
  { word: 'euphemism', meaning: 'An inoffensive expression substituted for an offensive one (n)' },
  { word: 'euphoria', meaning: 'A feeling of great elation (n)' },
  { word: 'evanescent', meaning: 'Short-lived; tending to vanish or disappear (adj)' },
  { word: 'evict', meaning: 'Expel or eject without recourse to legal process (v)' },
  { word: 'evoke', meaning: 'Call forth, as an emotion, feeling, or response (v)' },
  { word: 'exacerbate', meaning: 'Make worse (v)' },
  { word: 'exculpate', meaning: 'Pronounce not guilty of criminal charges (v)' },
  { word: 'exemplary', meaning: 'Worthy of imitation (adj)' },
  { word: 'exemplify', meaning: 'Be characteristic of (v)' },
  { word: 'exhort', meaning: 'Spur on or encourage especially by cheers and shouts (v)' },
  { word: 'exigent', meaning: 'Demanding immediate attention (adj)' },
  { word: 'exonerate', meaning: 'Pronounce not guilty of criminal charges (v)' },
  { word: 'exorbitant', meaning: 'Greatly exceeding bounds of reason or moderation (adj)' },
  { word: 'expend', meaning: 'Use up or consume fully (v)' },
  { word: 'expiate', meaning: 'Make amends for (v)' },
  { word: 'explicit', meaning: 'Precisely and clearly expressed or readily observable (adj)' },
  { word: 'exploit', meaning: 'Use or manipulate to one\'s advantage (v)' },
  { word: 'extant', meaning: 'Still in existence; not extinct or destroyed or lost (adj)' },
  { word: 'extempore', meaning: 'With little or no preparation or forethought (adj)' },
  { word: 'extensive', meaning: 'Large in spatial extent or range or scope or quantity (adj)' },
  { word: 'extent', meaning: 'The point or degree to which something extends (n)' },
  { word: 'extol', meaning: 'Praise, glorify, or honor (v)' },
  { word: 'extravagant', meaning: 'Recklessly wasteful (adj)' },
  { word: 'exuberant', meaning: 'Joyously unrestrained (adj)' },
  { word: 'facetious', meaning: 'Cleverly amusing in tone (adj)' },
  { word: 'faddish', meaning: 'Intensely fashionable or popular for a short time (adj)' },
  { word: 'fallacious', meaning: 'Containing or based on incorrect reasoning (adj)' },
  { word: 'fallacy', meaning: 'A misconception resulting from incorrect reasoning (n)' },
  { word: 'falter', meaning: 'Move hesitatingly, as if about to give way (v)' },
  { word: 'fanatical', meaning: 'Marked by excessive enthusiasm for a cause or idea (adj)' },
  { word: 'fathom', meaning: 'A linear unit of measurement for water depth (n)' },
  { word: 'fawn', meaning: 'A young deer (n)' },
  { word: 'feckless', meaning: 'Generally incompetent and ineffectual (adj)' },
  { word: 'feign', meaning: 'Make believe with the intent to deceive (v)' },
  { word: 'felicitate', meaning: 'Express congratulations (v)' },
  { word: 'felon', meaning: 'Someone who has been legally convicted of a crime (n)' },
  { word: 'fervent', meaning: 'Characterized by intense emotion (adj)' },
  { word: 'fervid', meaning: 'Characterized by intense emotion (adj)' },
  { word: 'fervor', meaning: 'Feelings of great warmth and intensity (n)' },
  { word: 'feud', meaning: 'A bitter quarrel between two parties (n)' },
  { word: 'fickle', meaning: 'Liable to sudden unpredictable change (adj)' },
  { word: 'fidget', meaning: 'Move restlessly (v)' },
  { word: 'finicky', meaning: 'Fussy, especially about details (adj)' },
  { word: 'flamboyant', meaning: 'Tending to attract attention; marked by ostentatious display (adj)' },
  { word: 'flatter', meaning: 'Praise somewhat dishonestly (v)' },
  { word: 'flaunt', meaning: 'Display proudly (v)' },
  { word: 'fledgling', meaning: 'Young bird that has just become capable of flying (n)' },
  { word: 'flimsy', meaning: 'A thin strong lightweight translucent paper (adj)' },
  { word: 'flinch', meaning: 'Draw back, as with fear or pain (v)' },
  { word: 'flippant', meaning: 'Showing an inappropriate lack of seriousness (adj)' },
  { word: 'flirt', meaning: 'Talk or behave amorously, without serious intentions (v)' },
  { word: 'flop', meaning: 'Fall loosely (v)' },
  { word: 'florid', meaning: 'Elaborately or excessively ornamented (adj)' },
  { word: 'flounder', meaning: 'Move clumsily or struggle to move, as in mud or water (v)' },
  { word: 'flout', meaning: 'Treat with contemptuous disregard (v)' },
  { word: 'fluffy', meaning: 'Like down or as soft as down (adj)' },
  { word: 'fluke', meaning: 'A stroke of luck (n)' },
  { word: 'flustered', meaning: 'Thrown into a state of agitated confusion (adj)' },
  { word: 'foible', meaning: 'A minor weakness or peculiarity in someone\'s character (n)' },
  { word: 'foment', meaning: 'Try to stir up (v)' },
  { word: 'foolhardy', meaning: 'Marked by defiant disregard for danger or consequences (adj)' },
  { word: 'foppish', meaning: 'Overly concerned with extreme elegance in dress and manner (adj)' },
  { word: 'foreclosure', meaning: 'Proceedings initiated to repossess the collateral for a loan (n)' },
  { word: 'forestall', meaning: 'Keep from happening or arising; make impossible (v)' },
  { word: 'forge', meaning: 'Create by hammering (v)' },
  { word: 'forgery', meaning: 'Criminal falsification by making or altering an instrument (n)' },
  { word: 'formidable', meaning: 'Extremely impressive in strength or excellence (adj)' },
  { word: 'forthright', meaning: 'Directly and without evasion; not roundabout (adj)' },
  { word: 'fortuitous', meaning: 'Lucky; occurring by happy chance (adj)' },
  { word: 'foster', meaning: 'Providing nurture though not related by blood or legal ties (v)' },
  { word: 'fracas', meaning: 'A noisy quarrel (n)' },
  { word: 'fraud', meaning: 'Intentional deception resulting in injury to another person (n)' },
  { word: 'frenzy', meaning: 'State of violent mental agitation (n)' },
  { word: 'fret', meaning: 'Be agitated or irritated (v)' },
  { word: 'frivolous', meaning: 'Not serious in content, attitude, or behavior (adj)' },
  { word: 'frown', meaning: 'A facial expression of dislike or displeasure (v)' },
  { word: 'fulminate', meaning: 'Cause to explode violently and with loud noise (v)' },
  { word: 'furtive', meaning: 'Secret and sly (adj)' },
  { word: 'gaffe', meaning: 'A socially awkward or tactless act (n)' },
  { word: 'gainsay', meaning: 'Take exception to (v)' },
  { word: 'garner', meaning: 'Assemble or get together (v)' },
  { word: 'garrulous', meaning: 'Full of trivial conversation (adj)' },
  { word: 'gauche', meaning: 'Lacking social poise or refinement (adj)' },
  { word: 'gaudy', meaning: 'Tastelessly showy (adj)' },
  { word: 'gavel', meaning: 'A small mallet used by a presiding officer or a judge (n)' },
  { word: 'ghastly', meaning: 'Shockingly repellent; inspiring horror (adj)' },
  { word: 'gird', meaning: 'Bind with something round or circular (v)' },
  { word: 'gist', meaning: 'The central meaning or theme of a speech or literary work (n)' },
  { word: 'glib', meaning: 'Artfully persuasive in speech (adj)' },
  { word: 'gloat', meaning: 'Dwell on with satisfaction (v)' },
  { word: 'goad', meaning: 'Stab or urge on as if with a pointed stick (v)' },
  { word: 'gorge', meaning: 'A deep ravine, usually with a river running through it (n)' },
  { word: 'gossamer', meaning: 'A gauze fabric with an extremely fine texture (n)' },
  { word: 'gouge', meaning: 'An impression in a surface, as made by a blow (n)' },
  { word: 'gravel', meaning: 'Rock fragments and pebbles (n)' },
  { word: 'gravity', meaning: 'The force of attraction between all masses in the universe (n)' },
  { word: 'grazing', meaning: 'The act of grazing (n)' },
  { word: 'gregarious', meaning: 'Temperamentally seeking and enjoying the company of others (adj)' },
  { word: 'grill', meaning: 'A framework of metal bars used as a partition or a grate (n)' },
  { word: 'grovel', meaning: 'Show submission or fear (v)' },
  { word: 'grudging', meaning: 'Petty or reluctant in giving or spending (adj)' },
  { word: 'grumble', meaning: 'Make complaining remarks or noises under one\'s breath (v)' },
  { word: 'guarded', meaning: 'Cautious and reserved (adj)' },
  { word: 'guile', meaning: 'Shrewdness as demonstrated by being skilled in deception (n)' },
  { word: 'guileless', meaning: 'Innocent and free of deceit (adj)' },
  { word: 'gullible', meaning: 'Naive and easily deceived or tricked (adj)' },
  { word: 'hackneyed', meaning: 'Repeated too often; overfamiliar through overuse (adj)' },
  { word: 'hallucinate', meaning: 'Have illusions; perceive what is not actually there (v)' },
  { word: 'hamper', meaning: 'Prevent the progress or free movement of (v)' },
  { word: 'hapless', meaning: 'Unfortunate and deserving pity (adj)' },
  { word: 'harangue', meaning: 'A loud bombastic declamation expressed with strong emotion (n)' },
  { word: 'harbor', meaning: 'A sheltered port where ships can take on or discharge cargo (n)' },
  { word: 'herbaceous', meaning: 'Characteristic of a nonwoody herb or plant part (adj)' },
  { word: 'heretic', meaning: 'A person whose religious beliefs conflict with church dogma (n)' },
  { word: 'heretical', meaning: 'Departing from accepted beliefs or standards (adj)' },
  { word: 'heterodox', meaning: 'Characterized by departure from accepted standards (adj)' },
  { word: 'hoax', meaning: 'Something intended to deceive (n)' },
  { word: 'holster', meaning: 'A sheath for carrying a handgun (n)' },
  { word: 'homeopathy', meaning: 'A method of treating disease with small amounts of remedies that, in large amounts in healthy people, produce symptoms similar to those being treated (n)' },
  { word: 'hyperbole', meaning: 'Extravagant exaggeration (n)' },
  { word: 'hypocritical', meaning: 'Professing feelings or virtues one does not have (adj)' },
  { word: 'iconoclast', meaning: 'Someone who attacks cherished ideas or institutions (n)' },
  { word: 'idiosyncrasy', meaning: 'A behavioral attribute peculiar to an individual (n)' },
  { word: 'idolatrous', meaning: 'Relating to or practicing idolatry (adj)' },
  { word: 'illicit', meaning: 'Contrary to accepted morality or convention (adj)' },
  { word: 'imbibe', meaning: 'Take in liquids (v)' },
  { word: 'imbue', meaning: 'Spread or diffuse through (v)' },
  { word: 'immutable', meaning: 'Not subject or susceptible to change or variation (adj)' },
  { word: 'impair', meaning: 'Make worse or less effective (v)' },
  { word: 'impassive', meaning: 'Having or revealing little emotion or sensibility (adj)' },
  { word: 'impecunious', meaning: 'Not having enough money to pay for necessities (adj)' },
  { word: 'impede', meaning: 'Be a hindrance or obstacle to (v)' },
  { word: 'impediment', meaning: 'Something immaterial that interferes with action or progress (n)' },
  { word: 'imperative', meaning: 'Requiring attention or action (adj)' },
  { word: 'imperious', meaning: 'Having or showing arrogant superiority (adj)' },
  { word: 'impervious', meaning: 'Not admitting of passage or capable of being affected (adj)' },
  { word: 'impetuous', meaning: 'Characterized by undue haste and lack of thought (adj)' },
  { word: 'implacable', meaning: 'Incapable of being appeased or pacified (adj)' },
  { word: 'imposture', meaning: 'Pretending to be another person (n)' },
  { word: 'impregnable', meaning: 'Incapable of being attacked or tampered with (adj)' },
  { word: 'impromptu', meaning: 'With little or no preparation or forethought (adj)' },
  { word: 'improvidence', meaning: 'A lack of prudence, care, or foresight (n)' },
  { word: 'improvise', meaning: 'Manage in a makeshift way; do with whatever is at hand (v)' },
  { word: 'impudent', meaning: 'Improperly forward or bold (adj)' },
  { word: 'impugn', meaning: 'Attack as false or wrong (v)' },
  { word: 'impunity', meaning: 'Exemption from punishment or loss (n)' },
  { word: 'inadvertent', meaning: 'Happening by chance or unexpectedly or unintentionally (adj)' },
  { word: 'inauspicious', meaning: 'Boding ill (adj)' },
  { word: 'inchoate', meaning: 'Only partly in existence; imperfectly formed (adj)' },
  { word: 'incidence', meaning: 'The relative frequency of occurrence of something (n)' },
  { word: 'incipient', meaning: 'Only partly in existence; imperfectly formed (adj)' },
  { word: 'incongruous', meaning: 'Lacking in harmony or compatibility or appropriateness (adj)' },
  { word: 'incorrigible', meaning: 'Impervious to correction by punishment (adj)' },
  { word: 'incursion', meaning: 'The act of entering some territory or domain (n)' },
  { word: 'indelible', meaning: 'Not able to be forgotten, removed, or erased (adj)' },
  { word: 'indict', meaning: 'Accuse formally of a crime (v)' },
  { word: 'indigenous', meaning: 'Originating where it is found (adj)' },
  { word: 'indignant', meaning: 'Angered at something unjust or wrong (adj)' },
  { word: 'induce', meaning: 'Cause to act in a specified manner (v)' },
  { word: 'indulge', meaning: 'Yield to; give satisfaction to (v)' },
  { word: 'ineffable', meaning: 'Defying expression or description (adj)' },
  { word: 'inept', meaning: 'Generally incompetent and ineffectual (adj)' },
  { word: 'inextricable', meaning: 'Incapable of being disentangled or untied (adj)' },
  { word: 'infiltrate', meaning: 'Pass through an enemy line in a military conflict (v)' },
  { word: 'inflammable', meaning: 'Easily ignited (adj)' },
  { word: 'infuse', meaning: 'Fill, as with a certain quality (v)' },
  { word: 'ingenious', meaning: 'Showing inventiveness and skill (adj)' },
  { word: 'ingenuous', meaning: 'Lacking in sophistication or worldliness (adj)' },
  { word: 'ingrained', meaning: 'Deeply rooted; firmly fixed or held (adj)' },
  { word: 'inimical', meaning: 'Tending to obstruct or cause harm (adj)' },
  { word: 'iniquitous', meaning: 'Characterized by injustice or wickedness (adj)' },
  { word: 'innocuous', meaning: 'Not injurious to physical or mental health (adj)' },
  { word: 'inopportune', meaning: 'Not suitable for a purpose (adj)' },
  { word: 'inquisitive', meaning: 'Given to questioning (adj)' },
  { word: 'insatiate', meaning: 'Impossible to satisfy (adj)' },
  { word: 'insensible', meaning: 'Barely able to be perceived (adj)' },
  { word: 'insignia', meaning: 'A badge worn to show official position (n)' },
  { word: 'insinuate', meaning: 'Suggest in an indirect or covert way; give to understand (v)' },
  { word: 'insipid', meaning: 'Lacking interest or significance or impact (adj)' },
  { word: 'insular', meaning: 'Relating to or characteristic of or situated on an island (adj)' },
  { word: 'intact', meaning: 'Undamaged in any way (adj)' },
  { word: 'interregnum', meaning: 'The time between two reigns or governments (n)' },
  { word: 'intransigent', meaning: 'Impervious to pleas, persuasion, requests, or reason (adj)' },
  { word: 'intrepid', meaning: 'Invulnerable to fear or intimidation (adj)' },
  { word: 'intricate', meaning: 'Having many complexly arranged elements; elaborate (adj)' },
  { word: 'intrigue', meaning: 'A crafty and involved plot to achieve your ends (n)' },
  { word: 'inundate', meaning: 'Fill or cover completely, usually with water (v)' },
  { word: 'inured', meaning: 'Made tough by habitual exposure (adj)' },
  { word: 'invective', meaning: 'Abusive language used to express blame or censure (n)' },
  { word: 'invert', meaning: 'Turn inside out or upside down (v)' },
  { word: 'invigorate', meaning: 'Give life or energy to (v)' },
  { word: 'invoke', meaning: 'Request earnestly; ask for aid or protection (v)' },
  { word: 'irascible', meaning: 'Quickly aroused to anger (adj)' },
  { word: 'irate', meaning: 'Feeling or showing extreme anger (adj)' },
  { word: 'jamb', meaning: 'A vertical side piece of a door or window frame (n)' },
  { word: 'jeer', meaning: 'Laugh at with contempt and derision (v)' },
  { word: 'jeopardy', meaning: 'A source of danger (n)' },
  { word: 'jest', meaning: 'Activity characterized by good humor (n)' },
  { word: 'jocular', meaning: 'Characterized by jokes and good humor (adj)' },
  { word: 'jovial', meaning: 'Full of or showing high-spirited merriment (adj)' },
  { word: 'judicious', meaning: 'Marked by the exercise of common sense in practical matters (adj)' },
  { word: 'lackluster', meaning: 'Not having brilliance or vitality (adj)' },
  { word: 'laconic', meaning: 'Brief and to the point (adj)' },
  { word: 'lasso', meaning: 'A long noosed rope used to catch animals (n)' },
  { word: 'latitude', meaning: 'An imaginary line around the Earth parallel to the equator (n)' },
  { word: 'laudable', meaning: 'Worthy of high praise (adj)' },
  { word: 'lavish', meaning: 'Very generous (adj)' },
  { word: 'leash', meaning: 'Restraint consisting of a rope used to restrain an animal (n)' },
  { word: 'leaven', meaning: 'A substance used to produce fermentation in dough (n)' },
  { word: 'lethargic', meaning: 'Deficient in alertness or activity (adj)' },
  { word: 'lethargy', meaning: 'Inactivity; showing an unusual lack of energy (n)' },
  { word: 'levee', meaning: 'An embankment built to prevent a river from overflowing (n)' },
  { word: 'leviathan', meaning: 'The largest or most massive thing of its kind (n)' },
  { word: 'levy', meaning: 'Impose and collect (v)' },
  { word: 'libertine', meaning: 'Unrestrained by convention or morality (adj)' },
  { word: 'ligneous', meaning: 'Consisting of or resembling wood (adj)' },
  { word: 'limerick', meaning: 'A humorous rhymed verse form of five lines (n)' },
  { word: 'limp', meaning: 'Walk impeded by some physical injury (v)' },
  { word: 'linen', meaning: 'A fabric woven with fibers from the flax plant (n)' },
  { word: 'literal', meaning: 'Limited to the explicit meaning of a word or text (adj)' },
  { word: 'lizard', meaning: 'Relatively long-bodied reptile with legs and a tapering tail (n)' },
  { word: 'loafer', meaning: 'A person who is idle and does no work (n)' },
  { word: 'loll', meaning: 'Be lazy or idle (v)' },
  { word: 'loom', meaning: 'A textile machine for weaving yarn into a textile (n)' },
  { word: 'lope', meaning: 'Run easily (v)' },
  { word: 'loquacious', meaning: 'Full of trivial conversation (adj)' },
  { word: 'lucid', meaning: 'Transparently clear; easily understandable (adj)' },
  { word: 'lucrative', meaning: 'Producing a sizeable profit (adj)' },
  { word: 'ludicrous', meaning: 'Inviting ridicule (adj)' },
  { word: 'lugubrious', meaning: 'Excessively mournful (adj)' },
  { word: 'lull', meaning: 'Make calm or still (v)' },
  { word: 'lumber', meaning: 'The wood of trees prepared for use as building material (n)' },
  { word: 'luminous', meaning: 'Softly bright or radiant (adj)' },
  { word: 'lustrous', meaning: 'Reflecting light (adj)' },
  { word: 'mace', meaning: 'A ceremonial staff carried as a symbol of office (n)' },
  { word: 'macerate', meaning: 'Soften and cause to disintegrate as a result (v)' },
  { word: 'magnanimity', meaning: 'Nobility and generosity of spirit (n)' },
  { word: 'malapropism', meaning: 'Misuse of a word by confusion with one that sounds similar (n)' },
  { word: 'malevolent', meaning: 'Wishing or appearing to wish evil to others (adj)' },
  { word: 'malign', meaning: 'Speak unfavorably about (v)' },
  { word: 'malingerer', meaning: 'Someone shirking duty by feigning illness or incapacity (n)' },
  { word: 'manifest', meaning: 'Clearly revealed to the mind or the senses or judgment (adj)' },
  { word: 'martial', meaning: 'Suggesting war or military life (adj)' },
  { word: 'martinet', meaning: 'Someone who demands exact conformity to rules and forms (n)' },
  { word: 'maverick', meaning: 'Someone who exhibits independence in thought and action (n)' },
  { word: 'meager', meaning: 'Deficient in amount or quality or extent (adj)' },
  { word: 'meddle', meaning: 'Intrude in other people\'s affairs or business (v)' },
  { word: 'mediocre', meaning: 'Moderate to inferior in quality (adj)' },
  { word: 'mend', meaning: 'Restore by putting together what is torn or broken (v)' },
  { word: 'mendacious', meaning: 'Given to lying (adj)' },
  { word: 'mercenary', meaning: 'A person hired to fight for another country than their own (n)' },
  { word: 'mercurial', meaning: 'Liable to sudden unpredictable change (adj)' },
  { word: 'metaphysics', meaning: 'The philosophical study of being and knowing (n)' },
  { word: 'meticulous', meaning: 'Marked by precise accordance with details (adj)' },
  { word: 'mettle', meaning: 'The courage to carry on (n)' },
  { word: 'mettlesome', meaning: 'Having a proud, courageous, and unbroken spirit (adj)' },
  { word: 'minuscule', meaning: 'Very small (adj)' },
  { word: 'mirth', meaning: 'Great merriment (n)' },
  { word: 'misanthrope', meaning: 'Someone who dislikes people in general (n)' },
  { word: 'misnomer', meaning: 'An incorrect or unsuitable name (n)' },
  { word: 'misogynist', meaning: 'A misanthrope who dislikes women in particular (n)' },
  { word: 'mistrust', meaning: 'Regard with suspicion (v)' },
  { word: 'mitigate', meaning: 'Lessen or to try to lessen the seriousness or extent of (v)' },
  { word: 'moat', meaning: 'Ditch dug as a fortification and usually filled with water (n)' },
  { word: 'mollify', meaning: 'Cause to be more favorably inclined (v)' },
  { word: 'mollycoddle', meaning: 'Treat with excessive indulgence (v)' },
  { word: 'molt', meaning: 'Cast off hair, skin, horn, or feathers (v)' },
  { word: 'morose', meaning: 'Showing a brooding ill humor (adj)' },
  { word: 'mosaic', meaning: 'Design made of small pieces of colored stone or glass (n)' },
  { word: 'mundane', meaning: 'Found in the ordinary course of events (adj)' },
  { word: 'nadir', meaning: 'The lowest point of anything (n)' },
  { word: 'narcotic', meaning: 'A drug that produces numbness or stupor (n)' },
  { word: 'nausea', meaning: 'The state that precedes vomiting (n)' },
  { word: 'nefarious', meaning: 'Extremely wicked (adj)' },
  { word: 'neglect', meaning: 'Leave undone or leave out (v)' },
  { word: 'neuralgia', meaning: 'Acute spasmodic pain along the course of one or more nerves (n)' },
  { word: 'nocturnal', meaning: 'Belonging to or active during the night (adj)' },
  { word: 'noisome', meaning: 'Causing or able to cause nausea (adj)' },
  { word: 'nonchalant', meaning: 'Marked by casual unconcern or indifference (adj)' },
  { word: 'nondescript', meaning: 'Lacking distinct or individual characteristics (adj)' },
  { word: 'nonplused', meaning: 'Filled with bewilderment (adj)' },
  { word: 'note', meaning: 'A brief written record (n)' },
  { word: 'notion', meaning: 'A general inclusive concept (n)' },
  { word: 'oaf', meaning: 'An awkward, foolish person (n)' },
  { word: 'obdurate', meaning: 'Stubbornly persistent in wrongdoing (adj)' },
  { word: 'obeisance', meaning: 'Bending the head or body in reverence or submission (n)' },
  { word: 'obelisk', meaning: 'A stone pillar tapering towards a pyramidal top (n)' },
  { word: 'obese', meaning: 'Excessively large (adj)' },
  { word: 'obfuscate', meaning: 'Make obscure or unclear (v)' },
  { word: 'obituary', meaning: 'A notice of someone\'s death (n)' },
  { word: 'objurgate', meaning: 'Censure severely (v)' },
  { word: 'objurgation', meaning: 'Rebuking a person harshly (n)' },
  { word: 'oblation', meaning: 'The act of contributing to the funds of a church or charity (n)' },
  { word: 'obligatory', meaning: 'Required by compulsion or convention (adj)' },
  { word: 'oblique', meaning: 'Slanting or inclined in direction or course or position (adj)' },
  { word: 'obliquity', meaning: 'The quality of being deliberately vague or deceptive (n)' },
  { word: 'obliterate', meaning: 'Remove completely from recognition or memory (v)' },
  { word: 'oblivion', meaning: 'The state of being disregarded or forgotten (n)' },
  { word: 'obloquy', meaning: 'State of disgrace resulting from public abuse (n)' },
  { word: 'obnoxious', meaning: 'Causing disapproval or protest (adj)' },
  { word: 'obscure', meaning: 'Not clearly understood or expressed (adj)' },
  { word: 'obsequious', meaning: 'Attempting to win favor from influential people by flattery (adj)' },
  { word: 'obsession', meaning: 'An unhealthy and compulsive preoccupation with something (n)' },
  { word: 'obsidian', meaning: 'Glass formed by the cooling of lava without crystallization (n)' },
  { word: 'obsolete', meaning: 'No longer in use (adj)' },
  { word: 'obstetrician', meaning: 'A physician specializing in childbirth (n)' },
  { word: 'obstreperous', meaning: 'Noisily and stubbornly defiant (adj)' },
  { word: 'obtrude', meaning: 'Push to thrust outward (v)' },
  { word: 'obtrusive', meaning: 'Sticking out; protruding (adj)' },
  { word: 'obtuse', meaning: 'Of an angle, between 90 and 180 degrees (adj)' },
  { word: 'obviate', meaning: 'Do away with (v)' },
  { word: 'obvious', meaning: 'Easily perceived by the senses or grasped by the mind (adj)' },
  { word: 'occult', meaning: 'Supernatural forces and events and beings collectively (adj)' },
  { word: 'oculist', meaning: 'A person skilled in testing for defects of vision (n)' },
  { word: 'odious', meaning: 'Extremely repulsive or unpleasant (adj)' },
  { word: 'odium', meaning: 'Hate coupled with disgust (n)' },
  { word: 'odoriferous', meaning: 'Emitting a smell, especially an unpleasant smell (adj)' },
  { word: 'odorous', meaning: 'Having a characteristic aroma (adj)' },
  { word: 'offal', meaning: 'Viscera and trimmings of a butchered animal (n)' },
  { word: 'offertory', meaning: 'The offerings of the congregation at a religious service (n)' },
  { word: 'officious', meaning: 'Intrusive in a meddling or offensive manner (adj)' },
  { word: 'ogle', meaning: 'Stare or look at, especially with amorous intentions (v)' },
  { word: 'olfactory', meaning: 'Of or relating to the sense of smell (adj)' },
  { word: 'oligarchy', meaning: 'A political system governed by a few people (n)' },
  { word: 'ominous', meaning: 'Threatening or foreshadowing evil or tragic developments (adj)' },
  { word: 'omnipotent', meaning: 'Having unlimited power (adj)' },
  { word: 'omnipresent', meaning: 'Existing everywhere at once (adj)' },
  { word: 'omniscient', meaning: 'Knowing, seeing, or understanding everything (adj)' },
  { word: 'omnivorous', meaning: 'Feeding on both plants and animals (adj)' },
  { word: 'onerous', meaning: 'Burdensome or difficult to endure (adj)' },
  { word: 'onomatopoeia', meaning: 'Using words that imitate the sound they denote (n)' },
  { word: 'onslaught', meaning: 'An offensive against an enemy (n)' },
  { word: 'onus', meaning: 'A burdensome or difficult concern (n)' },
  { word: 'opalescent', meaning: 'Having a play of lustrous rainbow colors (adj)' },
  { word: 'opaque', meaning: 'Not transmitting or reflecting light or radiant energy (adj)' },
  { word: 'opiate', meaning: 'A narcotic drug (n)' },
  { word: 'opportune', meaning: 'Suitable or advantageous especially for a particular purpose (adj)' },
  { word: 'opportunist', meaning: 'A person who places expediency above principle (n)' },
  { word: 'opprobrious', meaning: 'Expressing offensive reproach (adj)' },
  { word: 'opprobrium', meaning: 'A state of extreme dishonor (n)' },
  { word: 'optician', meaning: 'A worker who makes glasses for remedying defects of vision (n)' },
  { word: 'optimum', meaning: 'Most desirable possible under a restriction (adj)' },
  { word: 'optometrist', meaning: 'A person skilled in testing for defects of vision (n)' },
  { word: 'opulence', meaning: 'Wealth as evidenced by sumptuous living (n)' },
  { word: 'opus', meaning: 'A musical work that has been created (n)' },
  { word: 'oratorio', meaning: 'A musical composition for voices and orchestra (n)' },
  { word: 'ordinance', meaning: 'An authoritative rule (n)' },
  { word: 'orientation', meaning: 'The act of determining one\'s position (n)' },
  { word: 'orifice', meaning: 'An opening, especially one that opens into a bodily cavity (n)' },
  { word: 'orison', meaning: 'Reverent petition to a deity (n)' },
  { word: 'ornate', meaning: 'Marked by complexity and richness of detail (adj)' },
  { word: 'ornithologist', meaning: 'A scientist who studies birds (n)' },
  { word: 'ornithology', meaning: 'The branch of zoology that studies birds (n)' },
  { word: 'orotund', meaning: 'Overly formal and pompous in style (adj)' },
  { word: 'orthography', meaning: 'Representing the sounds of a language by written symbols (n)' },
  { word: 'oscillate', meaning: 'Move or swing from side to side regularly (v)' },
  { word: 'ossified', meaning: 'Set in a rigid pattern of behavior, habits, or beliefs (adj)' },
  { word: 'ostensible', meaning: 'Appearing as such but not necessarily so (adj)' },
  { word: 'ostentatious', meaning: 'Intended to attract notice and impress others (adj)' },
  { word: 'ostracism', meaning: 'The act of excluding someone from society by general consent (n)' },
  { word: 'ostracize', meaning: 'Expel from a community or group (v)' },
  { word: 'outgrowth', meaning: 'The gradual beginning or coming forth (n)' },
  { word: 'outmoded', meaning: 'No longer in fashion (adj)' },
  { word: 'outset', meaning: 'The time at which something is supposed to begin (n)' },
  { word: 'overhaul', meaning: 'Make repairs, renovations, revisions or adjustments to (v)' },
  { word: 'overt', meaning: 'Open and observable; not secret or hidden (adj)' },
  { word: 'overture', meaning: 'Orchestral music at the beginning of an opera or musical (n)' },
  { word: 'overweening', meaning: 'Presumptuously arrogant (adj)' },
  { word: 'overwrought', meaning: 'Deeply agitated especially from emotion (adj)' },
  { word: 'pan', meaning: 'Shallow container made of metal (n)' },
  { word: 'panegyric', meaning: 'Formally expressing praise (n)' },
  { word: 'paragon', meaning: 'A perfect embodiment of a concept (n)' },
  { word: 'parasite', meaning: 'An animal or plant that lives in or on a host (n)' },
  { word: 'parquetry', meaning: 'A patterned wood inlay used to cover a floor (n)' },
  { word: 'pathology', meaning: 'The branch of medical science that studies diseases (n)' },
  { word: 'paucity', meaning: 'An insufficient quantity or number (n)' },
  { word: 'pebble', meaning: 'A small smooth rounded rock (n)' },
  { word: 'peccadillo', meaning: 'A petty misdeed (n)' },
  { word: 'pedant', meaning: 'A person who is preoccupied with rules and learning (n)' },
  { word: 'pedantry', meaning: 'An ostentatious and inappropriate display of learning (n)' },
  { word: 'pedestrian', meaning: 'A person who travels by foot (n)' },
  { word: 'peer', meaning: 'Look searchingly (v)' },
  { word: 'penchant', meaning: 'A strong liking or preference (n)' },
  { word: 'penury', meaning: 'A state of extreme poverty or destitution (n)' },
  { word: 'perch', meaning: 'An elevated place serving as a seat (n)' },
  { word: 'peremptory', meaning: 'Putting an end to all debate or action (adj)' },
  { word: 'perennial', meaning: 'Lasting an indefinitely long time (adj)' },
  { word: 'perfidious', meaning: 'Tending to betray (adj)' },
  { word: 'perfidy', meaning: 'An act of deliberate betrayal (n)' },
  { word: 'perfunctory', meaning: 'Hasty and without attention to detail; not thorough (adj)' },
  { word: 'pernicious', meaning: 'Exceedingly harmful (adj)' },
  { word: 'perpetuate', meaning: 'Cause to continue or prevail (v)' },
  { word: 'perplex', meaning: 'Be a mystery or bewildering to (v)' },
  { word: 'pertinent', meaning: 'Being of striking appropriateness (adj)' },
  { word: 'pervade', meaning: 'Spread or diffuse through (v)' },
  { word: 'pestilence', meaning: 'Any epidemic disease with a high death rate (n)' },
  { word: 'petition', meaning: 'A formal request that something be submitted to an authority (n)' },
  { word: 'petulance', meaning: 'An irritable feeling (n)' },
  { word: 'petulant', meaning: 'Easily irritated or annoyed (adj)' },
  { word: 'philanthropist', meaning: 'Someone who makes charitable donations (n)' },
  { word: 'phlegmatic', meaning: 'Showing little emotion (adj)' },
  { word: 'pillage', meaning: 'Steal goods; take as spoils (v)' },
  { word: 'pine', meaning: 'A coniferous tree (n)' },
  { word: 'piquant', meaning: 'Having an agreeably pungent taste (adj)' },
  { word: 'pique', meaning: 'Call forth, as an emotion, feeling, or response (v)' },
  { word: 'pitch', meaning: 'The high or low quality of a sound (n)' },
  { word: 'pith', meaning: 'Spongelike central cylinder of the stems of flowering plants (n)' },
  { word: 'placate', meaning: 'Cause to be more favorably inclined (v)' },
  { word: 'placid', meaning: 'Calm and free from disturbance (adj)' },
  { word: 'plaintiff', meaning: 'A person who brings an action in a court of law (n)' },
  { word: 'plaintive', meaning: 'Expressing sorrow (adj)' },
  { word: 'platitude', meaning: 'A trite or obvious remark (n)' },
  { word: 'plea', meaning: 'A humble request for help from someone in authority (n)' },
  { word: 'plead', meaning: 'Appeal or request earnestly (v)' },
  { word: 'plethora', meaning: 'Extreme excess (n)' },
  { word: 'plod', meaning: 'Walk heavily and firmly, as when weary, or through mud (v)' },
  { word: 'pluck', meaning: 'Pull lightly but sharply (v)' },
  { word: 'plumb', meaning: 'Exactly vertical (adj)' },
  { word: 'plummet', meaning: 'Drop sharply (v)' },
  { word: 'polemic', meaning: 'A verbal or written attack, especially of a belief or dogma (n)' },
  { word: 'polymath', meaning: 'A person of great and varied learning (n)' },
  { word: 'ponderous', meaning: 'Having great mass and weight and unwieldiness (adj)' },
  { word: 'posit', meaning: 'Take as a given; assume as a postulate or axiom (v)' },
  { word: 'posture', meaning: 'The arrangement of the body and its limbs (n)' },
  { word: 'practitioner', meaning: 'Someone who carries out a learned profession (n)' },
  { word: 'preamble', meaning: 'A preliminary introduction, as to a statute or constitution (n)' },
  { word: 'precarious', meaning: 'Not secure; beset with difficulties (adj)' },
  { word: 'precedence', meaning: 'Status established in order of importance or urgency (n)' },
  { word: 'precious', meaning: 'Of high worth or cost (adj)' },
  { word: 'precipice', meaning: 'A very steep cliff (n)' },
  { word: 'precipitate', meaning: 'Bring about abruptly (v)' },
  { word: 'precipitous', meaning: 'Extremely steep (adj)' },
  { word: 'preclude', meaning: 'Make impossible, especially beforehand (v)' },
  { word: 'precursor', meaning: 'Something indicating the approach of something or someone (n)' },
  { word: 'predilection', meaning: 'A predisposition in favor of something (n)' },
  { word: 'predisposition', meaning: 'An inclination to interpret statements in a particular way (n)' },
  { word: 'preen', meaning: 'Clean with one\'s bill (v)' },
  { word: 'premise', meaning: 'A statement that is held to be true (n)' },
  { word: 'prerogative', meaning: 'A right reserved exclusively by a person or group (n)' },
  { word: 'prescience', meaning: 'The power to foresee the future (n)' },
  { word: 'presume', meaning: 'Take to be the case or to be true (v)' },
  { word: 'presumption', meaning: 'A premise that is taken for granted (n)' },
  { word: 'presumptuous', meaning: 'Going beyond what is appropriate, permitted, or courteous (adj)' },
  { word: 'prevaricate', meaning: 'Be deliberately ambiguous or unclear (v)' },
  { word: 'pristine', meaning: 'Immaculately clean and unused (adj)' },
  { word: 'probity', meaning: 'Complete and confirmed integrity (n)' },
  { word: 'proclamation', meaning: 'A formal public statement (n)' },
  { word: 'proclivity', meaning: 'A natural inclination (n)' },
  { word: 'prodigal', meaning: 'Recklessly wasteful (adj)' },
  { word: 'prodigality', meaning: 'The trait of spending extravagantly (n)' },
  { word: 'prodigious', meaning: 'Great in size, force, extent, or degree (adj)' },
  { word: 'prodigy', meaning: 'An unusually gifted or intelligent person (n)' },
  { word: 'profligate', meaning: 'Unrestrained by convention or morality (adj)' },
  { word: 'profound', meaning: 'Situated at or extending to great depth (adj)' },
  { word: 'profundity', meaning: 'The quality of being physically deep (n)' },
  { word: 'profuse', meaning: 'Produced or growing in extreme abundance (adj)' },
  { word: 'prolong', meaning: 'Lengthen in time; cause to be or last longer (v)' },
  { word: 'prompt', meaning: 'According to schedule or without delay (adj)' },
  { word: 'prone', meaning: 'Having a tendency (adj)' },
  { word: 'propensity', meaning: 'A natural inclination (n)' },
  { word: 'propitiate', meaning: 'Make peace with (v)' },
  { word: 'proposition', meaning: 'A suggestion offered for acceptance or rejection (n)' },
  { word: 'propriety', meaning: 'Correct behavior (n)' },
  { word: 'prosaic', meaning: 'Lacking wit or imagination (adj)' },
  { word: 'protracted', meaning: 'Relatively long in duration (adj)' },
  { word: 'provocation', meaning: 'A means of arousing or stirring to action (n)' },
  { word: 'provocative', meaning: 'Serving or tending to excite or stimulate (adj)' },
  { word: 'prudent', meaning: 'Marked by sound judgment (adj)' },
  { word: 'prune', meaning: 'Cultivate, tend, and cut back the growth of (v)' },
  { word: 'pucker', meaning: 'Gather something into small wrinkles or folds (v)' },
  { word: 'pugnacious', meaning: 'Ready and able to resort to force or violence (adj)' },
  { word: 'pundit', meaning: 'An expert who publicly gives opinions via mass media (n)' },
  { word: 'pungent', meaning: 'Strong and sharp to the sense of taste or smell (adj)' },
  { word: 'pusillanimous', meaning: 'Lacking in courage, strength, and resolution (adj)' },
  { word: 'putrefy', meaning: 'Decay with an offensive smell (v)' },
  { word: 'quack', meaning: 'The sound made by a duck (n)' },
  { word: 'quaff', meaning: 'Swallow hurriedly or greedily or in one draught (v)' },
  { word: 'qualm', meaning: 'Uneasiness about the fitness of an action (n)' },
  { word: 'quarantine', meaning: 'Isolation to prevent the spread of infectious disease (n)' },
  { word: 'quash', meaning: 'Declare invalid (v)' },
  { word: 'quenching', meaning: 'The act of extinguishing; causing to stop burning (n)' },
  { word: 'quibble', meaning: 'Evade the truth of a point by raising irrelevant objections (v)' },
  { word: 'quiescence', meaning: 'A state of quiet but possibly temporary inaction (n)' },
  { word: 'quintessential', meaning: 'Representing the perfect example of a class or quality (adj)' },
  { word: 'quiver', meaning: 'Shake with fast, tremulous movements (v)' },
  { word: 'quotidian', meaning: 'Found in the ordinary course of events (adj)' },
  { word: 'ramification', meaning: 'A consequence, especially one that causes complications (n)' },
  { word: 'rampant', meaning: 'Occurring or increasing in an unrestrained way (adj)' },
  { word: 'ranger', meaning: 'An official responsible for managing an area of forest (n)' },
  { word: 'rarefy', meaning: 'Lessen the density or solidity of (v)' },
  { word: 'rash', meaning: 'Imprudently incurring risk (adj)' },
  { word: 'rationale', meaning: 'An explanation of the fundamental reasons (n)' },
  { word: 'recalcitrant', meaning: 'Stubbornly resistant to authority or control (adj)' },
  { word: 'recant', meaning: 'Formally reject or disavow a formerly held belief (v)' },
  { word: 'recede', meaning: 'Pull back or move away or backward (v)' },
  { word: 'reciprocal', meaning: 'Concerning each of two or more persons or things (adj)' },
  { word: 'reckless', meaning: 'Marked by defiant disregard for danger or consequences (adj)' },
  { word: 'recluse', meaning: 'One who lives in solitude (n)' },
  { word: 'recompense', meaning: 'Make payment to (v)' },
  { word: 'recondite', meaning: 'Difficult to understand (adj)' },
  { word: 'recourse', meaning: 'Act of turning to for assistance (n)' },
  { word: 'redeem', meaning: 'Exchange or buy back for money; under threat (v)' },
  { word: 'redoubtable', meaning: 'Inspiring fear (adj)' },
  { word: 'refractory', meaning: 'Stubbornly resistant to authority or control (adj)' },
  { word: 'refurbish', meaning: 'Improve the appearance or functionality of (v)' },
  { word: 'reinstate', meaning: 'Bring back into original existence, function, or position (v)' },
  { word: 'rejoicing', meaning: 'A feeling of great happiness (n)' },
  { word: 'remorse', meaning: 'A feeling of deep regret, usually for some misdeed (n)' },
  { word: 'rescind', meaning: 'Cancel officially (v)' },
  { word: 'reticent', meaning: 'Reluctant to draw attention to yourself (adj)' },
  { word: 'reverberate', meaning: 'Ring or echo with sound (v)' },
  { word: 'rigor', meaning: 'Excessive sternness (n)' },
  { word: 'rotundity', meaning: 'The roundness of a 3-dimensional object (n)' },
  { word: 'salvage', meaning: 'Rescuing a ship or its crew from a shipwreck or a fire (v)' },
  { word: 'sate', meaning: 'Fill to contentment (v)' },
  { word: 'saturnine', meaning: 'Bitter or scornful (adj)' },
  { word: 'savant', meaning: 'A learned person (n)' },
  { word: 'scattered', meaning: 'Lacking orderly continuity (adj)' },
  { word: 'sedulous', meaning: 'Marked by care and persistent effort (adj)' },
  { word: 'shatter', meaning: 'Break into many pieces (v)' },
  { word: 'shirk', meaning: 'Avoid one\'s assigned duties (v)' },
  { word: 'shrill', meaning: 'Having or emitting a high-pitched and sharp tone or tones (adj)' },
  { word: 'shuck', meaning: 'Material consisting of seed coverings and small pieces of stem or leaves that have been separated from the seeds (n)' },
  { word: 'shun', meaning: 'Avoid and stay away from deliberately (v)' },
  { word: 'shunt', meaning: 'A conductor diverting a fraction of current from a device (n)' },
  { word: 'simper', meaning: 'Smile in an insincere, unnatural, or coy way (v)' },
  { word: 'sinister', meaning: 'Wicked, evil, or dishonorable (adj)' },
  { word: 'sip', meaning: 'Drink in sips (v)' },
  { word: 'skeptical', meaning: 'Marked by or given to doubt (adj)' },
  { word: 'sketchy', meaning: 'Giving only major points; lacking completeness (adj)' },
  { word: 'skiff', meaning: 'A small boat propelled by oars or by sails or by a motor (n)' },
  { word: 'slack', meaning: 'Not tense or taut (adj)' },
  { word: 'sloppy', meaning: 'Lacking neatness or order (adj)' },
  { word: 'slur', meaning: 'Utter indistinctly (v)' },
  { word: 'smother', meaning: 'Deprive of oxygen and prevent from breathing (v)' },
  { word: 'sober', meaning: 'Not affected by a chemical substance, especially alcohol (adj)' },
  { word: 'somber', meaning: 'Serious and gloomy in character (adj)' },
  { word: 'sordid', meaning: 'Foul and run-down and repulsive (adj)' },
  { word: 'specious', meaning: 'Plausible but false (adj)' },
  { word: 'spell', meaning: 'Write or name the letters that comprise the accepted form of a word (v)' },
  { word: 'spendthrift', meaning: 'Someone who spends money freely or wastefully (n)' },
  { word: 'spine', meaning: 'The series of vertebrae forming the backbone (n)' },
  { word: 'sporadic', meaning: 'Recurring in scattered or unpredictable instances (adj)' },
  { word: 'spurious', meaning: 'Plausible but false (adj)' },
  { word: 'squalid', meaning: 'Foul and run-down and repulsive (adj)' },
  { word: 'squander', meaning: 'Spend thoughtlessly; throw away (v)' },
  { word: 'squelch', meaning: 'Suppress or crush completely (v)' },
  { word: 'stake', meaning: 'A strong wooden or metal post driven into the ground (n)' },
  { word: 'stark', meaning: 'Severely simple (adj)' },
  { word: 'startle', meaning: 'Surprise greatly (v)' },
  { word: 'steadfast', meaning: 'Marked by firm determination or resolution; not shakable (adj)' },
  { word: 'steep', meaning: 'Having a sharp inclination (adj)' },
  { word: 'stickler', meaning: 'Someone who insists on something (n)' },
  { word: 'stiff', meaning: 'Incapable of or resistant to bending (adj)' },
  { word: 'stifled', meaning: 'Held in check with difficulty (adj)' },
  { word: 'stigma', meaning: 'A symbol of disgrace or infamy (n)' },
  { word: 'stigmatize', meaning: 'Condemn or openly brand as disgraceful (v)' },
  { word: 'stint', meaning: 'Supply sparingly and with restricted quantities (v)' },
  { word: 'stipulate', meaning: 'Make an express demand or provision in an agreement (v)' },
  { word: 'stockade', meaning: 'Fortification consisting of a fence set firmly for defense (n)' },
  { word: 'stoop', meaning: 'Bend one\'s back forward from the waist on down (v)' },
  { word: 'strain', meaning: 'Exert much effort or energy (v)' },
  { word: 'stray', meaning: 'Wander from a direct course or at random (v)' },
  { word: 'striate', meaning: 'Marked with stripes (v)' },
  { word: 'strive', meaning: 'Attempt by employing effort (v)' },
  { word: 'strut', meaning: 'Walk in a proud, confident way (v)' },
  { word: 'subdue', meaning: 'Put down by force or intimidation (v)' },
  { word: 'suborn', meaning: 'Incite to commit a crime or an evil deed (v)' },
  { word: 'subpoena', meaning: 'A writ issued to compel the attendance of a witness (n)' },
  { word: 'subsequent', meaning: 'Following in time or order (adj)' },
  { word: 'subside', meaning: 'Wear off or die down (v)' },
  { word: 'substantial', meaning: 'Real; having a material or factual existence (adj)' },
  { word: 'succumb', meaning: 'Give in, as to overwhelming force, influence, or pressure (v)' },
  { word: 'supplant', meaning: 'Take the place or move into the position of (v)' },
  { word: 'supplicate', meaning: 'Ask for humbly or earnestly, as in prayer (v)' },
  { word: 'susceptible', meaning: 'Yielding readily to or capable of (adj)' },
  { word: 'sway', meaning: 'Move back and forth (v)' },
  { word: 'swift', meaning: 'Moving very fast (adj)' },
  { word: 'swindle', meaning: '(offensive) Deprive of by deceit (v)' },
  { word: 'syncopated', meaning: 'Stressing a normally weak beat (adj)' },
  { word: 'tacit', meaning: 'Implied by or inferred from actions or statements (adj)' },
  { word: 'taciturn', meaning: 'Habitually reserved and uncommunicative (adj)' },
  { word: 'tamp', meaning: 'Press down tightly (v)' },
  { word: 'tangential', meaning: 'Of superficial relevance if any (adj)' },
  { word: 'tangible', meaning: 'Perceptible by the senses, especially the sense of touch (adj)' },
  { word: 'tantalize', meaning: 'Harass with persistent teasing or baiting (v)' },
  { word: 'tapestry', meaning: 'A wall hanging of heavy fabric with pictorial designs (n)' },
  { word: 'tarnish', meaning: 'Make or become dirty or dull, as by exposure to air (v)' },
  { word: 'taut', meaning: 'Pulled or drawn tight (adj)' },
  { word: 'temperate', meaning: 'Not extreme (adj)' },
  { word: 'tenable', meaning: 'Based on sound reasoning or evidence (adj)' },
  { word: 'tentative', meaning: 'Hesitant or lacking confidence; unsettled in mind or opinion (adj)' },
  { word: 'tepid', meaning: 'Moderately warm (adj)' },
  { word: 'tirade', meaning: 'A speech of violent denunciation (n)' },
  { word: 'topple', meaning: 'Fall down, as if collapsing (v)' },
  { word: 'torment', meaning: 'Intense feelings of suffering; acute mental or physical pain (n)' },
  { word: 'torpid', meaning: 'In a condition of biological rest or suspended animation (adj)' },
  { word: 'torpor', meaning: 'A state of motor and mental inactivity (n)' },
  { word: 'tout', meaning: 'Advertise in strongly positive terms (v)' },
  { word: 'traitor', meaning: 'A person who says one thing and does another (n)' },
  { word: 'trample', meaning: 'Tread or stomp heavily or roughly (v)' },
  { word: 'transgress', meaning: 'Act in disregard of laws, rules, contracts, or promises (v)' },
  { word: 'treacherous', meaning: 'Dangerously unstable and unpredictable (adj)' },
  { word: 'tremor', meaning: 'An involuntary vibration, as if from illness or fear (n)' },
  { word: 'trenchant', meaning: 'Having keenness and forcefulness and penetration in thought (adj)' },
  { word: 'trepidation', meaning: 'A feeling of alarm or dread (n)' },
  { word: 'truce', meaning: 'A state of peace agreed to between opponents (n)' },
  { word: 'truculence', meaning: 'Stubborn and defiant aggressiveness (n)' },
  { word: 'turpitude', meaning: 'A corrupt or depraved or degenerate act or practice (n)' },
  { word: 'tyro', meaning: 'Someone new to a field or activity (n)' },
  { word: 'unequivocal', meaning: 'Admitting of no doubt or misunderstanding (adj)' },
  { word: 'untenable', meaning: 'Incapable of being defended or justified (adj)' },
  { word: 'untoward', meaning: 'Not in keeping with accepted standards of what is proper (adj)' },
  { word: 'uphold', meaning: 'Stand up for; stick up for; of causes, principles, or ideals (v)' },
  { word: 'uproar', meaning: 'A state of commotion and noise and confusion (n)' },
  { word: 'usurp', meaning: 'Seize and take control without authority (v)' },
  { word: 'vacillate', meaning: 'Be undecided about something (v)' },
  { word: 'vagary', meaning: 'An unexpected and inexplicable change in something (n)' },
  { word: 'vagrant', meaning: 'A wanderer with no established residence or means of support (n)' },
  { word: 'valiant', meaning: 'Having or showing heroism or courage (adj)' },
  { word: 'vanity', meaning: 'Feelings of excessive pride (n)' },
  { word: 'varnish', meaning: 'A coating that provides a hard, lustrous finish to a surface (n)' },
  { word: 'vehemence', meaning: 'Intensity or forcefulness of expression (n)' },
  { word: 'venerable', meaning: 'Profoundly honored (adj)' },
  { word: 'venerate', meaning: 'Regard with feelings of respect and reverence (v)' },
  { word: 'veracious', meaning: 'Habitually speaking the truth (adj)' },
  { word: 'veracity', meaning: 'Unwillingness to tell lies (n)' },
  { word: 'verdant', meaning: 'Characterized by abundance of vegetation and green foliage (adj)' },
  { word: 'veritable', meaning: 'Not counterfeit or copied (adj)' },
  { word: 'vertigo', meaning: 'A reeling sensation; a feeling that you are about to fall (n)' },
  { word: 'vex', meaning: 'Disturb, especially by minor irritations (v)' },
  { word: 'viable', meaning: 'Capable of life or normal growth and development (adj)' },
  { word: 'vicious', meaning: 'Having the nature of evildoing (adj)' },
  { word: 'vigilance', meaning: 'The process of paying close and continuous attention (n)' },
  { word: 'vigor', meaning: 'Forceful exertion (n)' },
  { word: 'vilify', meaning: 'Spread negative information about (v)' },
  { word: 'vindicate', meaning: 'Show to be right by providing justification or proof (v)' },
  { word: 'vindictive', meaning: 'Disposed to seek revenge or intended for revenge (adj)' },
  { word: 'vituperate', meaning: 'Spread negative information about (v)' },
  { word: 'vituperative', meaning: 'Marked by harshly abusive criticism (adj)' },
  { word: 'vogue', meaning: 'A current state of general acceptance and use (n)' },
  { word: 'volubility', meaning: 'The quality of being facile in speech and writing (n)' },
  { word: 'voluptuous', meaning: 'Displaying luxury and furnishing gratification to the senses (adj)' },
  { word: 'voracious', meaning: 'Devouring or craving food in great quantities (adj)' },
  { word: 'vulnerable', meaning: 'Capable of being wounded or hurt (adj)' },
  { word: 'wan', meaning: 'Pale, as of a person\'s complexion (adj)' },
  { word: 'wardrobe', meaning: 'A piece of furniture that provides storage space for clothes (n)' },
  { word: 'wary', meaning: 'Marked by keen caution and watchful prudence (adj)' },
  { word: 'waver', meaning: 'Pause or hold back in uncertainty or unwillingness (v)' },
  { word: 'weary', meaning: 'Physically and mentally fatigued (adj)' },
  { word: 'welter', meaning: 'A confused multitude of things (n)' },
  { word: 'wheedle', meaning: 'Influence or urge by gentle urging, caressing, or flattering (v)' },
  { word: 'whimsical', meaning: 'Determined by chance or impulse rather than by necessity (adj)' },
  { word: 'wile', meaning: 'The use of tricks to deceive someone (n)' },
  { word: 'withhold', meaning: 'Hold back; refuse to hand over or share (v)' },
  { word: 'zealot', meaning: 'A fervent and even militant proponent of something (n)' },
  { word: 'zenith', meaning: 'The highest point of something (n)' },
  { word: 'zephyr', meaning: 'A slight wind (n)' }
];

const easyWords = ["adverse","absurd", "ally", "augment", "abyss", "confidential", "affliction", "apparition", "apprehension", "approbation", "attentive", "disinterested", "dedication", "detached", "defer", "annotate", "diligent", "disguise", "blunder", "benevolent", "fraud", "formidable", "board", "breach", "harbor", "claim", "clumsy", "composure", "conceit", "confound", "bogus", "bizarre", "contend", "crave", "decree", "defiance", "desperate", "drought", "jeopardy", "embrace", "lizard", "endeavor", "extent", "extensive", "extravagant", "flatter", "gravel", "gravity", "clot", "leaven", "linen", "manifest", "neglect", "note", "notion", "obscure", "obvious", "commentator", "distract", "pan", "pine", "concede", "pitch", "plead", "pluck", "precious", "presume", "prodigious", "profound", "prudent", "rash", "reckless", "remorse", "traitor", "redeem", "rejoicing", "scattered", "sober", "spell", "dwarf", "steep", "stiff", "strain", "strive", "subdue", "swift", "torment", "vanity", "forgery", "vex", "weary", "grazing", "prodigy", "pebble", "peer", "flirt", "flop", "vulnerable", "grill", "tentative", "drone", "dumbfound", "eradicate", "homeopathy", "oscillate", "lucrative", "gist", "parasite", "obsession", "pundit", "pungent"];

const mediumWords = [ "alacrity", "adamant", "audacious", "averse", "adulterate", "adept", "aspiration", "ambiguous", "affluent", "austere", "annex", "brisk", "conjecture", "antiseptic", "conspicuous", "consternation", "covert", "covet", "dearth","discourse", "din", "dubious", "exhort", "forge", "barefaced", "fret", "frown", "gird", "ghastly", "guarded", "hapless", "brood", "impassive", "censure", "oblation", "impudent", "indignant", "induce", "indulge", "ingenious", "insensible", "disdain", "deprive", "latitude", "devoid", "literal", "lull", "lustrous", "meddle", "mend", "odious", "ominous", "omnipotent", "perch", "guile", "petition", "caustic", "censor", "placid", "plea", "posture", "proclamation", "prolong", "prompt", "ordinance", "prone", "provocation", "ponderous", "confrontation", "quiver", "propriety", "controversial", "exploit", "shun", "sinister", "slack", "falter", "spine", "convoke", "stake", "stark", "recompense", "stray", "debacle", "deft", "subsequent", "sway", "stoop", "shrill", "temperate", "uproar", "treacherous", "despicable", "deter", "withhold", "valiant", "immutable", "jest", "judicious", "lasso", "lavish", "discrete", "invoke", "lethargic", "prune", "lucid", "disprove", "vigilance", "vigor", "distraught", "zenith", "whimsical", "vicious", "viable", "tyro", "tarnish", "hoax", "invert", "reciprocal", "succumb", "mediocre", "quarantine", "foster", "pristine", "pathology", "ranger", "inflammable", "infuse", "premise", "explicit", "tout", "skeptical", "tremor"];

const hardWords = ["abeyance", "admonish", "affable", "allegiance", "ambrosial", "ascetic", "enchant", "ascribe", "agitate", "bleak", "asperity", "avarice", "avert", "ambivalent", "antipathy", "amenable", "assess", "arduous", "baleful", "aptitude", "balk", "bask", "eloquence", "epistle", "ensign", "fervent", "belie", "benign", "blithe", "atone", "bog", "bolster", "brittle", "avid", "banal", "auspicious", "cant", "caprice", "cavern", "cogent", "complacent", "concession", "condescend", "confine", "conjure", "console", "cajole", "contentious", "catalyst", "contrite", "corporal", "corroborate", "craven", "pestilence", "credulity", "castigate", "curb", "dazzle", "coherent", "deference", "mirth", "defiant", "deluge", "demur", "coerce", "denounce", "concur", "collusion", "diffident", "discreet", "dislodge", "conducive", "disparity", "dispel", "dissent", "docile", "doleful", "conspire", "conifer", "convoluted", "drab", "drawl", "droll", "dupe", "consensus", "dwindle", "venerable", "dampen", "dangle", "effrontery", "demote", "elusive", "enigma", "entrenched", "deprivation", "crease", "extant", "disassemble", "fanatical", "fathom", "feign", "felon", "flaunt", "florid", "fluffy", "fluke", "frenzy", "frivolous", "gainsay", "dissemble", "divest", "gorge", "gouge", "dogmatic", "hamper", "heretic", "hypocritical", "idolatrous", "egalitarian", "elicit", "impediment", "imperious", "impetuous", "implacable", "impregnable", "endorse", "incongruous", "ineffable", "engender", "ingenuous", "inquisitive", "insatiate", "epitome", "insipid", "insular", "intrepid", "intricate", "inured", "jeer", "lethargy", "levee", "levy", "libertine", "loom", "evoke", "lumber", "evict", "luminous", "mace", "magnanimity", "malign", "martial", "metaphysics", "mettle", "mistrust", "mitigate", "expend", "fallacy", "mundane", "nocturnal", "noisome", "nonchalant", "obdurate", "obeisance", "oblique", "oblivion", "feud", "obsequious", "occult", "odorous", "officious", "omnivorous", "opaque", "opportune", "opprobrious", "outset", "overture", "penury", "peremptory", "perennial", "perfidious", "pernicious", "perplex", "petulance", "plaintive", "plumb", "plummet", "precedence", "gullible", "precipice", "precipitate", "presumption", "presumptuous", "prodigal", "profligate", "profundity", "profuse", "quack", "propensity", "proposition", "prosaic", "protracted", "pugnacious", "rampant", "recede", "imperative", "illicit", "recondite", "sate", "skiff", "smother", "specious", "squalid", "steadfast", "stifled", "subside", "indigenous", "incursion", "indelible", "indict", "infiltrate", "substantial", "susceptible", "tacit", "taut", "tepid", "torpid", "trample", "trepidation", "truce", "unequivocal", "untoward", "uphold", "inept", "verdant", "veritable", "vindictive", "voluptuous", "voracious", "wan", "sporadic", "spurious", "squander", "wardrobe", "wary", "waver", "rigor", "zephyr", "varnish", "tangible", "jovial", "maverick", "refurbish", "stint", "meager", "mosaic", "nadir", "philanthropist", "narcotic", "nausea", "vindicate", "nefarious", "vogue", "obnoxious", "meticulous"];

const veryHardWords = ["aberrant", "abscond", "abstemious", "abstruse", "acquiesce", "articulate", "antediluvian", "adulate", "adulation", "adumbrate", "aesthete", "aggrandize", "agog", "allegation", "amalgamate", "ameliorate", "anachronism", "analgesic", "annul", "anomalous", "aphoristic", "engrossed", "apocryphal", "appraise", "apprise", "aqueous", "arable", "arbitrate", "aspersion", "assuage", "astringent", "astute", "atrophy", "attenuate", "aver", "baneful", "banter", "bellicose", "bilk", "blandishment", "bombast", "boor", "burgeon", "burlesque", "buttress", "cadge", "calisthenics", "captor", "transgress", "cessation", "decorum", "charter", "chary", "chicanery", "circumlocution", "circumspect", "coagulant", "cognizance", "commensurate", "descry", "complaisant", "conciliatory", "dirge", "concoct", "conflagration", "conflate", "congruent", "conscript", "consign", "contingent", "cower", "coy", "crockery", "culpable", "dabble", "debilitate", "decorous", "decry", "delineate", "denunciation", "deposition", "desiccate", "diatribe", "dichotomy", "digress", "dilettante", "disabuse", "espy", "disburse", "extol", "facetious", "fallacious", "discomfit", "disparate", "fickle", "dispassionate", "foible", "disrobe", "distend", "divulge", "dormant", "garner", "gaudy", "ebullient", "gregarious", "eclectic", "efface", "efficacious", "egregious", "elucidate", "embellish", "emissary", "emollient", "encomium", "encroach", "impromptu", "encumber", "enervate", "inextricable", "enlist", "enthral", "ephemeral", "epistemology", "epithet", "equivocate", "equivocation", "erratic", "erudite", "eschew", "esoteric", "espouse", "ethos", "euphemism", "euphoria", "evanescent", "exacerbate", "exculpate", "exemplary", "exemplify", "exigent", "exonerate", "exorbitant", "expiate", "extempore", "exuberant", "faddish", "fawn", "feckless", "felicitate", "fervid", "fervor", "fidget", "finicky", "flamboyant", "fledgling", "flimsy", "flinch", "flippant", "flounder", "omniscient", "flout", "flustered", "foment", "foolhardy", "foppish", "ostensible", "ostentatious", "foreclosure", "forestall", "forthright", "fortuitous", "fracas", "fulminate", "furtive", "gaffe", "garrulous", "gauche", "gavel", "glib", "gloat", "goad", "gossamer", "grovel", "grudging", "grumble", "guileless", "hackneyed", "hallucinate", "harangue", "herbaceous", "heretical", "heterodox", "holster", "hyperbole", "iconoclast", "idiosyncrasy", "imbibe", "imbue", "impair", "impecunious", "impede", "impervious", "imposture", "improvidence", "improvise", "impugn", "impunity", "inadvertent", "inauspicious", "inchoate", "incidence", "incipient", "incorrigible", "ingrained", "inimical", "iniquitous", "innocuous", "inopportune", "insignia", "insinuate", "intact", "interregnum", "usurp", "vagrant", "vehemence", "veracity", "intransigent", "intrigue", "inundate", "invective", "invigorate", "irascible", "irate", "jamb", "jocular", "leviathan", "lackluster", "laconic", "laudable", "leash", "ligneous", "limerick", "limp", "loafer", "loll", "lope", "loquacious", "ludicrous", "lugubrious", "macerate", "malapropism", "malevolent", "malingerer", "martinet", "mendacious", "mercenary", "mercurial", "mettlesome", "minuscule", "misanthrope", "misnomer", "misogynist", "moat", "mollify", "mollycoddle", "molt", "morose", "neuralgia", "nondescript", "nonplused", "oaf", "obelisk", "obese", "obfuscate", "obituary", "objurgate", "objurgation", "obligatory", "obliquity", "obliterate", "obloquy", "obsidian", "obsolete", "obstetrician", "obstreperous", "obtrude", "obtrusive", "obtuse", "obviate", "oculist", "odium", "odoriferous", "offal", "offertory", "ogle", "olfactory", "oligarchy", "omnipresent", "onerous", "onomatopoeia", "onslaught", "onus", "opalescent", "opiate", "opportunist", "opprobrium", "optician", "optimum", "optometrist", "opulence", "opus", "oratorio", "orientation", "orifice", "orison", "ornate", "ornithologist", "ornithology", "orotund", "orthography", "ossified", "ostracism", "ostracize", "outgrowth", "outmoded", "overhaul", "overt", "overweening", "overwrought", "panegyric", "paragon", "parquetry", "paucity", "peccadillo", "pedant", "pedantry", "pedestrian", "penchant", "perfidy", "perfunctory", "perpetuate", "pertinent", "pervade", "petulant", "phlegmatic", "pillage", "piquant", "pique", "pith", "placate", "plaintiff", "platitude", "plethora", "plod", "polemic", "polymath", "posit", "practitioner", "preamble", "precarious", "precipitous", "preclude", "precursor", "predilection", "predisposition", "preen", "prerogative", "prescience", "prevaricate", "probity", "proclivity", "prodigality", "propitiate", "provocative", "pucker", "pusillanimous", "putrefy", "quaff", "qualm", "quash", "quenching", "quibble", "quiescence", "quintessential", "quotidian", "ramification", "rarefy", "rationale", "recalcitrant", "recant", "recluse", "recourse", "redoubtable", "refractory", "reinstate", "rescind", "reticent", "reverberate", "rotundity", "salvage", "saturnine", "savant", "sedulous", "shatter", "shirk", "shuck", "shunt", "simper", "sip", "sketchy", "sloppy", "slur", "somber", "sordid", "spendthrift", "squelch", "startle", "stickler", "stigma", "stigmatize", "stipulate", "stockade", "striate", "strut", "suborn", "subpoena", "supplant", "supplicate", "swindle", "syncopated", "taciturn", "tamp", "tangential", "tantalize", "tapestry", "tenable", "tirade", "topple", "torpor", "trenchant", "truculence", "turpitude", "untenable", "vacillate", "vagary", "venerate", "veracious", "vertigo", "vilify", "vituperate", "vituperative", "volubility", "welter", "wheedle", "wile", "zealot"];



const useStreak = () => {
  const [streak, setStreak] = useState(
    typeof window !== 'undefined' && localStorage.getItem('streak') ? parseInt(localStorage.getItem('streak')) : 0
  );

  useEffect(() => {
    localStorage.setItem('streak', streak);
  }, [streak]);

  return [streak, setStreak];
};

const GameBox = ({ selectedWordData, correctLetters, incorrectLetters, check, usedHint }) => {
  const getLetterElements = () => {
    if (!selectedWordData) return null;
    const letterElements = [];
    for (let i = 0; i < selectedWordData.word.length; i++) {
      letterElements.push(
        <li
          key={i}
          className={`${styles.letter} animate__animated animate__fadeIn`}
        >
          {correctLetters.includes(selectedWordData.word[i]) ? selectedWordData.word[i] : ''}
        </li>
      );
    }
    return letterElements;
  };

  return (
    <div className={`${styles.content} animate__animated animate__fadeIn`}>
      <ul id="word" className={styles.word}>{getLetterElements()}</ul>
      <div id="incorrect" className={`${styles.incorrect} ${incorrectLetters.length > 0 ? styles.visible : ''}`}>
        <h2 className='text-red-100'>Wrong Guesses : </h2>
        <p id="Incword" className='text-red-400'>{incorrectLetters.join(', ')}</p>
      </div>
    </div>
  );
};

const FinalMessage = ({ gameState, selectedWordData, streak, startNewGame }) => {
  const router = useRouter();
  if (gameState !== 'won' && gameState !== 'lost') return null;
  return (
    <div id="final-msg" className={`${styles.finalMsg} ${styles.visible} animate__animated visible`}>
      <p id="msg-info" className="msg-info"></p>
      {gameState === 'won' && <p>You guessed &apos;<span className='text-green-500 text-2xl'>{selectedWordData?.word}</span>&apos; correctly! Keep the streak hot!</p>}
      {gameState === 'lost' && <p>Oops! You lost. The right word is &apos;<span className='text-red-500 text-2xl'>{selectedWordData?.word}</span>&apos;</p>}
      <div className={styles.buttonContainer}>
      <div className={styles.buttonContainer2}>  
        <button
          className={styles.share}
          onClick={() => {
            const shareData = {
              title: 'My GRE Word Wrangle Streak!',
              text: `My GRE Word Wrangle streak is ${streak} words! Can you beat my score?`,
              url: 'https://wordwrangle.vercel.app/',
            };

            if (navigator.share) {
              navigator.share(shareData)
                .then(() => console.log('Successfully shared'))
                .catch((err) => console.error('Error sharing:', err));
            } else {
              const fallbackUrl = `https://wa.me/?text=${encodeURIComponent(
                shareData.text
              )}%20${encodeURIComponent(shareData.url)}`;
              window.open(fallbackUrl, '_blank');
            }
          }}
        >
          Share
        </button>
        <button
          className={styles.goHome}
          onClick={() => {
            if(gameState === 'lost'){
              localStorage.setItem('streak', 0);
            }
            router.push('/');
          }}
        >
          Home
        </button>
      </div>
        <button id="play" className={styles.play} onClick={startNewGame}>
          Play Again
        </button>
      </div>
    </div>
  );
};

const GREWordWrangle = () => {
  const [selectedWordData, setSelectedWordData] = useState(null);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [usedHint, setUsedHint] = useState(false);
  const [streak, setStreak] = useStreak();
  const [gameState, setGameState] = useState('playing');
  const [hintPressed, setHintPressed] = useState(false);
  const [highestStreak, setHighestStreak] = useState(0);
  const hasUpdatedRef = useRef(false); // Use ref instead of state for hasUpdated


  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;
      const { data } = await axios.get(`/api/getUser?userId=${userId}`);
      setHighestStreak(data.highestStreak);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = 'user-' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('userId', userId);
    }
    initializeWord();
    fetchUserData();
  },[]);


  const resetHangmanSVG = () => {
    const bodyParts = document.getElementsByClassName(styles.bodyPart);
    for (let part of bodyParts) {
      part.style.display = 'none';
      part.classList.remove('animate__animated', 'animate__fadeIn');
    }
  };

  const initializeWord = () => {
    let wordListToUse;
    let streakCount;

    if(gameState === 'lost'){
      streakCount = 0
    }
    else{
        streakCount = localStorage.getItem('streak');
        if (streakCount === null) {
          streakCount = 0;
        } else {
          streakCount = parseInt(streakCount, 10);
        }
    }

    if (streakCount >= 0 && streakCount <= 2) {
      wordListToUse = easyWords; // List of easy words
    } else if (streakCount > 2 && streakCount <= 7) {
      wordListToUse = mediumWords; // List of medium words
    } else if (streakCount > 7 && streakCount <= 16) {
      wordListToUse = hardWords; // List of hard words
    } else {
      wordListToUse = veryHardWords; // List of very hard words
    }    

    const selectedWord = wordListToUse[Math.floor(Math.random() * wordListToUse.length)];
    const selectedWordObj = wordList.find(wordObj => wordObj.word === selectedWord);
    
    // console.log(selectedWordObj);

    setSelectedWordData(selectedWordObj);
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setIncorrectCount(0);
    setUsedHint(false);
    hasUpdatedRef.current = false; // Reset the ref when initializing a new word
    setGameState('playing');
    resetHangmanSVG();
    setHintPressed(false); // Reset hintPressed state
  };

  const displayIndication = (id) => {
    const indication = document.getElementById(id);
    indication.classList.add('visible');
    indication.style.display = 'block';

    setTimeout(() => {
      indication.classList.remove('visible');
      indication.style.display = 'none';
    }, 2400);
  };

  const updateFigure = useCallback(() => {
    const bodyParts = document.getElementsByClassName(styles.bodyPart);
    if (bodyParts[incorrectCount]) {
      // console.log('Displaying body part at index: ', incorrectCount);
      bodyParts[incorrectCount].style.display = 'block';
      bodyParts[incorrectCount].classList.add('animate__animated', 'animate__fadeIn');
    }
  }, [incorrectCount]);

  const successState = useCallback(() => {
    setGameState('won');
    setStreak(streak + 1);
    if (streak > highestStreak) {
      setHighestStreak(streak);
      const userId = localStorage.getItem('userId');
      axios.post('/api/updateUser', { userId, highestStreak: streak });
      // console.log("2nd update called");
    }
    setIncorrectCount((prevCount) => { // This call is now outside the nested callback
      const newCount = prevCount + 1;
      // console.log(`Incorrect count updated: ${newCount}`);
      return newCount;
    });
  }, [streak]);


  const failureState = useCallback(() => {
    if (!hasUpdatedRef.current) {
      setGameState('lost');
      hasUpdatedRef.current = true;
      // console.log(hasUpdatedRef.current);
      const userId = localStorage.getItem('userId');
      axios.post('/api/updateUser', { userId, highestStreak: streak, wrongGuess: { word: selectedWordData?.word, meaning: selectedWordData?.meaning } })
        .then(() => {
          // console.log("first update called", hasUpdatedRef.current);
        })
        .catch(error => console.error('Error updating user:', error));
    }
  }, [selectedWordData, streak]);
  


const check = useCallback((character) => {
  if (gameState !== 'playing') return;

  character = character.toLowerCase();

  // console.log(`Checking character: ${character}`);

  if (selectedWordData.word.includes(character)) {
    if (!correctLetters.includes(character)) {
      setCorrectLetters((prev) => {
        const newCorrectLetters = [...prev, character];
        if (selectedWordData.word.split('').every(letter => newCorrectLetters.includes(letter))) {
          const correctAudio = new Audio('/correct.mp3');
          correctAudio.play().then(() => {
            successState();
          }).catch(err => {
            // console.log('Audio play prevented:', err);
            successState(); // Call successState even if audio fails to play
          });
        }
        return newCorrectLetters;
      });
    } else {
      displayIndication('indication');
    }
  } else {
    if (!incorrectLetters.includes(character)) {
      setIncorrectLetters((prev) => [...prev, character]);
      setIncorrectCount((prevCount) => {
        const newCount = prevCount + 1;
        // console.log(`Incorrect count updated: ${newCount}`);
        if (newCount >= 5) {
          const incorrectAudio = new Audio('/incorrect.mp3');
          incorrectAudio.play().then(() => {
            failureState();
          }).catch(err => {
            // console.log('Audio play prevented:', err);
            failureState(); // Call failureState even if audio fails to play
          });
        }
        return newCount;
      });
    } else {
      displayIndication('indication');
    }
  }
}, [selectedWordData, correctLetters, incorrectLetters, gameState, successState, failureState]);


  useEffect(() => {
    updateFigure();
  }, [incorrectCount]);

  const showHint = () => {
    if (usedHint || gameState !== 'playing') {
      displayIndication('indication2');
      return;
    }
    setUsedHint(true);
    const unrevealedIndexes = selectedWordData.word.split('').map((_, index) => index).filter(i => !correctLetters.includes(selectedWordData.word[i]));
    const randomIndex = unrevealedIndexes[Math.floor(Math.random() * unrevealedIndexes.length)];
    const newCorrectLetters = [...correctLetters, selectedWordData.word[randomIndex]];
  
    setCorrectLetters(newCorrectLetters)
      // Check if the user has won after using the hint
  if (selectedWordData.word.split('').every(letter => newCorrectLetters.includes(letter))) {
    const correctAudio = new Audio('/correct.mp3');
    correctAudio.play().then(() => {
      successState();
    }).catch(err => {
      // console.log('Audio play prevented:', err);
      successState(); // Call successState even if audio fails to play
    });
  }
  setHintPressed(true); // Change state to indicate hint button is pressed
  };

  const startNewGame = () => {
    if (gameState === 'lost') setStreak(0);
    hasUpdatedRef.current = false; // Reset the ref when initializing a new word
    initializeWord();
  };

  useEffect(() => {
    const handleKeyUp = (ev) => {
      if (gameState === 'playing' && ev.key.match(/^[a-z]$/i)) {
        check(ev.key.toLowerCase());
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [check, gameState]);

  return (
    <div className={styles.container}>
      <div className={styles.meaningBox}>
        <p id="word-meaning">{selectedWordData?.meaning}</p>
      </div>
      
      <div
        className={`fixed top-[15px] left-[20px] z-100 `}
      >
        <button
          onClick={showHint}
          disabled={gameState !== 'playing'}
          className={`font-poppins ${hintPressed ? 'bg-gradient-to-r from-gray-300 to-gray-600 border-2 border-gray-900' : 'bg-gradient-to-r from-yellow-200 to-yellow-400 border-2 border-yellow-500'} text-[2.5rem] font-bold text-black  rounded-xl px-[11px] lg:px-[15px] py-[1.5px]  cursor-pointer transition-transform transform hover:scale-105 flex items-center shadow-md uppercase`}
        >
          <FontAwesomeIcon className="text-[20px] py-3 md:text-[28px] lg:mr-4 hover:text-yellow-50" icon={faLightbulb} />
          <span className="text-[25px] font-[800] hidden md:block transform skew-x-[-4deg]">Hint</span>
        </button>
      </div>


      <div className={styles.streakCounter}>
        Streak: <span className='text-3xl md:text-[28px]' id="streak">{streak}</span>
      </div>
      <div className={styles.gameBox}>
      <svg className={`${styles.figure} animate__animated animate__fadeIn`}>
        <line x1="25%" y1="5%" x2="65%" y2="5%"/>
        <line x1="65%" y1="5%" x2="65%" y2="20%"/>
        <line x1="25%" y1="5%" x2="25%" y2="95%"/>
        <line x1="5%" y1="95%" x2="45%" y2="95%"/>
        <circle r="10%" cx="65%" cy="30%" className={styles.bodyPart}/>
        <line x1="65%" y1="40%" x2="65%" y2="60%" className={styles.bodyPart} />
        <line x1="50%" y1="40%" x2="65%" y2="50%" className={styles.bodyPart} />
        <line x1="80%" y1="40%" x2="65%" y2="50%" className={styles.bodyPart} />
        <line x1="65%" y1="60%" x2="80%" y2="70%" className={styles.bodyPart} />
        <line x1="65%" y1="60%" x2="50%" y2="70%" className={styles.bodyPart} />
      </svg>
        <GameBox
          selectedWordData={selectedWordData}
          correctLetters={correctLetters}
          incorrectLetters={incorrectLetters}
          check={check}
          usedHint={usedHint}
        />
        <FinalMessage
          gameState={gameState}
          selectedWordData={selectedWordData}
          streak={streak}
          startNewGame={startNewGame}
        />
        <div id="indication" className={`${styles.indication} animate__animated`}>
          <p>You have already entered this letter</p>
        </div>
        <div id="indication2" className={`${styles.indication} animate__animated`}>
          <p>You get only 1 hint per word</p>
        </div>
        
        <div className={styles.keyboard}>
          <div className={styles.keyRow}>
            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter) => (
              <button
                key={letter}
                className={`font-roboto text-[14px] py-2 px-2 font-bold m-[2.6px] ${correctLetters.includes(letter.toLowerCase()) ? 'bg-green-300 text-green-800' : incorrectLetters.includes(letter.toLowerCase()) ? 'bg-red-200 text-red-700' : 'bg-gray-100 text-gray-900'} rounded-lg shadow-key-yellow cursor-pointer transition-colors duration-200 ease-in-out transform hover:scale-105`}
                style={{ minWidth: '28px' }}
                onClick={() => check(letter.toLowerCase())}
              >
                {letter}
              </button>
            ))}
          </div>
          <div className={styles.keyRow}>
            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter) => (
              <button
                key={letter}
                className={`font-roboto text-[14px] py-2 px-2 font-bold m-[2.6px] ${correctLetters.includes(letter.toLowerCase()) ? 'bg-green-300 text-green-800' : incorrectLetters.includes(letter.toLowerCase()) ? 'bg-red-200 text-red-700' : 'bg-gray-100 text-gray-900'} rounded-lg shadow-key-yellow cursor-pointer transition-colors duration-200 ease-in-out transform hover:scale-105`}
                style={{ minWidth: '28px' }}
                onClick={() => check(letter.toLowerCase())}
                >
                {letter}
              </button>
            ))}
          </div>
          <div className={styles.keyRow}>
            {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((letter) => (
              <button
                key={letter}
                className={`font-roboto text-[14px] py-2 px-2 font-bold m-[2.6px] ${correctLetters.includes(letter.toLowerCase()) ? 'bg-green-300 text-green-800' : incorrectLetters.includes(letter.toLowerCase()) ? 'bg-red-200 text-red-700' : 'bg-gray-100 text-gray-900'} rounded-lg shadow-key-yellow cursor-pointer transition-colors duration-200 ease-in-out transform hover:scale-105`}
                style={{ minWidth: '28px' }}
                onClick={() => check(letter.toLowerCase())}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>


      </div>
    </div>
  );
};

export default GREWordWrangle;
