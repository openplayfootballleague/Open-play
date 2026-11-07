import { useState } from "react";
import { Activity, AlertCircle, ArrowUpRight, BarChart3, Bell, CalendarDays, CheckCircle2, ChevronRight, ClipboardList, Flag, LayoutDashboard, LifeBuoy, Menu, Plus, Search, Settings, ShieldCheck, Trophy, UserRound, Users, Wallet, X } from "lucide-react";
type Section = "Overview" | "Competitions" | "Teams" | "Players" | "Applications" | "Fixtures" | "Results" | "Statistics" | "Discipline" | "Finance" | "Analytics" | "Communications" | "Enquiries" | "Operations" | "Settings";
const items: {label:Section; icon:any; group:string}[] = [
{label:"Overview",icon:LayoutDashboard,group:"WORKSPACE"},{label:"Competitions",icon:Trophy,group:"MANAGEMENT"},{label:"Teams",icon:Flag,group:"MANAGEMENT"},{label:"Players",icon:Users,group:"MANAGEMENT"},{label:"Applications",icon:ClipboardList,group:"MANAGEMENT"},{label:"Fixtures",icon:CalendarDays,group:"MATCHDAY"},{label:"Results",icon:CheckCircle2,group:"MATCHDAY"},{label:"Discipline",icon:ShieldCheck,group:"MATCHDAY"},{label:"Statistics",icon:BarChart3,group:"INSIGHTS"},{label:"Analytics",icon:BarChart3,group:"INSIGHTS"},{label:"Finance",icon:Wallet,group:"INSIGHTS"},{label:"Communications",icon:Bell,group:"ORGANISATION"},{label:"Enquiries",icon:ClipboardList,group:"ORGANISATION"},{label:"Operations",icon:LifeBuoy,group:"ORGANISATION"},{label:"Settings",icon:Settings,group:"ORGANISATION"}];
const descriptions:Record<Section,[string,string]> = {
Overview:["Your organisation at a glance","Operational summaries will appear here once competitions and records are connected."],
Competitions:["No competitions yet","Create your first competition and season. Each competition will have its own format, venue, schedule and team entries."],
Teams:["No teams to display","Approved team entries will appear here, organised by competition and season."],
Players:["No player records yet","Player profiles will appear here after registrations are submitted or records are added by an administrator."],
Applications:["No applications awaiting review","New team and player applications will be collected here for review."],
Fixtures:["No fixtures scheduled","Fixtures will appear here once a season has participating teams and a published schedule."],
Results:["No results recorded","Published match results and scorecards will appear here."],
Statistics:["Statistics will build from match records","Only verified appearances, goals and assists will be shown. No sample statistics are used."],
Discipline:["No discipline records yet","Player incidents, team strikes, fines and suspensions will be managed here with restricted access and an audit trail."],
Analytics:["No analytics available yet","Financial, competition, venue and growth reporting will appear when verified records exist."],
Finance:["No financial records yet","Team fees, payments, fines and expenses will be recorded here when finance is configured."],
Communications:["No communications yet","Announcements and delivery history will appear here once messaging is configured."],
Enquiries:["No enquiries yet","Player, team, referee, sponsorship and general enquiries will be collected in one chronological register."],
Operations:["No operational records yet","Manage venues, referee availability and assignments, and sponsor agreements here."],
Settings:["Platform setup","Configure the services and permissions needed to run Open Play. Sensitive credentials will be stored outside the source code."]
};
function Brand(){return <div className="brand"><div className="brand-mark">OP</div><div><strong>OPEN PLAY</strong><span>ADMINISTRATION</span></div></div>}
export default function App(){
const [active,setActive]=useState<Section>("Overview");const [mobile,setMobile]=useState(false);const [query,setQuery]=useState("");const [notice,setNotice]=useState("Foundation preview · No live data connected");
const groups=Array.from(new Set(items.map(x=>x.group)));
const filtered=items.filter(x=>x.label.toLowerCase().includes(query.toLowerCase()));
const go=(s:Section)=>{setActive(s);setMobile(false)};
return <div className="app-shell">{mobile&&<button className="scrim" onClick={()=>setMobile(false)} aria-label="Close menu"/>}
<aside className={"sidebar "+(mobile?"sidebar-open":"")}><div className="side-head"><Brand/><button className="close-menu" onClick={()=>setMobile(false)}><X size={18}/></button></div><div className="admin-label"><ShieldCheck size={14}/> ADMIN DASHBOARD</div>
<div className="side-search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a section"/><kbd>/</kbd></div>
<nav>{query?filtered.map(n=><Nav key={n.label} item={n} active={active===n.label} go={()=>go(n.label)}/>):groups.map(g=><div className="nav-group" key={g}><div className="nav-heading">{g}</div>{items.filter(x=>x.group===g).map(n=><Nav key={n.label} item={n} active={active===n.label} go={()=>go(n.label)}/>)}</div>)}</nav>
<div className="side-foot"><LifeBuoy size={18}/><div><b>Open Play support</b><span>Administration workspace</span></div></div></aside>
<main><header className="topbar"><div className="crumb"><button className="menu-toggle" onClick={()=>setMobile(true)}><Menu size={19}/></button>Open Play <ChevronRight size={14}/><b>{active}</b></div><div className="top-actions"><div className="league">Current view <b>All competitions</b></div><button className="plain-icon" onClick={()=>setNotice("There are no live notifications yet.")}><Bell size={18}/></button><div className="admin-user"><div>OP</div><span>Administrator</span></div></div></header>
<div className="content"><div className="page-head"><div><small>OPEN PLAY / ADMINISTRATION</small><h1>{active}</h1><p>{active==="Overview"?"Your operational command centre.":"Manage and review Open Play "+active.toLowerCase()+" records."}</p></div><label><i/> FOUNDATION PREVIEW</label></div>
{active==="Overview"?<>
<section className="hero"><div><small>WELCOME TO OPEN PLAY</small><h2>Run your leagues.<br/><em>Keep the game moving.</em></h2><p>Your administration workspace is ready for its first competition.</p></div><div className="hero-logo">OP<span>FOOTBALL LEAGUE MANAGEMENT</span></div></section>
<div className="section-head"><div><h2>Organisation overview</h2><p>Live operational information will populate as your data is connected.</p></div><span>No live data</span></div>
<div className="summary-grid"><Summary icon={Trophy} label="Competitions" detail="No competitions configured"/><Summary icon={Flag} label="Registered teams" detail="Awaiting team entries"/><Summary icon={Users} label="Registered players" detail="Awaiting registrations"/><Summary icon={CalendarDays} label="Upcoming fixtures" detail="No fixtures scheduled"/></div>
<section className="attention"><div className="attention-head"><div><small>OPERATIONAL TASK CENTRE</small><h2>Needs attention</h2><p>Items that need an administrator's action.</p></div><b>2</b></div>
<Task icon={Trophy} title="No competition selected" tag="SETUP" detail="Choose or create a competition to begin configuring Open Play." action="Open competitions" click={()=>go("Competitions")}/>
<Task icon={ShieldCheck} title="Connect your data services" tag="TECHNICAL" detail="Authentication and database connections have not been configured yet." action="View settings" click={()=>go("Settings")}/></section>
<div className="lower-grid"><section className="surface"><div className="surface-head"><div><h3>Quick actions</h3><p>Start with the essentials.</p></div><Activity size={17}/></div><div className="quick-grid">{([["Create competition","Competitions",Plus],["Add a team","Teams",Flag],["Add a player","Players",UserRound],["Create fixtures","Fixtures",CalendarDays],["Enter a result","Results",CheckCircle2],["New announcement","Communications",Bell]] as const).map(([label,target,Icon])=><button key={label} onClick={()=>go(target)}><Icon size={16}/>{label}</button>)}</div></section><section className="surface"><div className="surface-head"><div><h3>Recent activity</h3><p>Recorded changes across your organisation.</p></div><Activity size={17}/></div><div className="activity-empty">No activity recorded yet</div></section></div>
</>:<section className="workspace"><div className="workspace-tools"><div><Search size={16}/><input placeholder={"Search "+active.toLowerCase()+"..."}/></div><button className="primary" onClick={()=>setNotice("The "+active.toLowerCase()+" workflow will be enabled when the database is connected.")}><Plus size={16}/> Add new</button></div><div className="empty"><div><ClipboardList size={22}/></div><h3>{descriptions[active][0]}</h3><p>{descriptions[active][1]}</p></div></section>}
<footer><span>OPEN PLAY <b>•</b> BUILT FOR THE GAME</span><span>Foundation preview · 2026</span></footer></div>
{notice&&<div className="toast"><AlertCircle size={15}/>{notice}<button onClick={()=>setNotice("")}><X size={14}/></button></div>}</main></div>
}
function Nav({item,active,go}:{item:{label:Section;icon:any};active:boolean;go:()=>void}){const Icon=item.icon;return <button className={"nav-item "+(active?"nav-item-active":"")} onClick={go}><Icon size={17}/><span>{item.label}</span>{active&&<i/>}</button>}
function Summary({icon:Icon,label,detail}:{icon:any;label:string;detail:string}){return <div className="summary-card"><div><span>{label}</span><Icon size={17}/></div><strong>—</strong><small>{detail}</small></div>}
function Task({icon:Icon,title,tag,detail,action,click}:{icon:any;title:string;tag:string;detail:string;action:string;click:()=>void}){return <div className="task"><div className="task-icon"><Icon size={17}/></div><div className="task-copy"><strong>{title} <span>{tag}</span></strong><p>{detail}</p></div><button onClick={click}>{action}<ArrowUpRight size={15}/></button></div>}
