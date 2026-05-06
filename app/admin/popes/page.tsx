"use client";
import { useEffect, useState, useCallback } from "react";
interface Item { _id: string; n: number; name: string; reign: string; nat: string; saint: boolean; img?: string; }
const empty = { n: "", name: "", reign: "", nat: "", saint: false, img: "", note: "" };

export default function AdminPopes() {
  const [items, setItems] = useState<Item[]>([]); const [total, setTotal] = useState(0); const [pages, setPages] = useState(1); const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); const [form, setForm] = useState<Record<string,unknown>>(empty); const [editing, setEditing] = useState<string|null>(null); const [saving, setSaving] = useState(false);

  const load = useCallback(async (p=1) => {
    setLoading(true);
    const r = await fetch(`/api/admin/popes?page=${p}&search=${encodeURIComponent(search)}`);
    const d = await r.json(); setItems(d.items??[]); setTotal(d.total??0); setPages(d.pages??1); setPage(p); setLoading(false);
  }, [search]);

  useEffect(() => { load(1); }, []);
  const save = async () => { setSaving(true); await fetch("/api/admin/popes",{method:editing?"PUT":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(editing?{...form,_id:editing}:form)}); setSaving(false); setShowForm(false); setEditing(null); setForm(empty); load(page); };
  const del = async (_id:string) => { if(!confirm("Delete this pope?"))return; await fetch("/api/admin/popes",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id})}); load(page); };
  const edit = (item:Item) => { setForm(item as unknown as Record<string,unknown>); setEditing(item._id); setShowForm(true); };
  const inp = {width:"100%",padding:"0.5rem 0.75rem",border:"1px solid #ddd",borderRadius:"6px",fontSize:"0.85rem",boxSizing:"border-box" as const};
  const lbl = {display:"block" as const,fontSize:"0.75rem",fontWeight:600 as const,color:"#555",marginBottom:"0.25rem"};

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
        <div><h1 style={{fontFamily:"Georgia, serif",color:"#1a2744",fontSize:"1.5rem",margin:"0 0 0.2rem"}}>Popes</h1><p style={{color:"#888",fontSize:"0.8rem",margin:0}}>{total} popes added via admin (265 from static data also shown on site)</p></div>
        <div style={{display:"flex",gap:"0.5rem"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load(1)} placeholder="Search popes..." style={{...inp,width:"200px"}}/>
          <button onClick={()=>load(1)} style={{padding:"0.5rem 1rem",background:"#1a2744",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"0.85rem"}}>Search</button>
          <button onClick={()=>{setForm(empty);setEditing(null);setShowForm(true);}} style={{padding:"0.5rem 1rem",background:"#c9a84c",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"0.85rem",fontWeight:600}}>+ Add Pope</button>
        </div>
      </div>

      {showForm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
          <div style={{background:"#fff",borderRadius:"12px",padding:"2rem",width:"100%",maxWidth:"600px",maxHeight:"90vh",overflowY:"auto"}}>
            <h2 style={{fontFamily:"Georgia, serif",color:"#1a2744",margin:"0 0 1.5rem"}}>{editing?"Edit":"Add"} Pope</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
              <div><label style={lbl}>Number (n)</label><input type="number" style={inp} value={(form.n as string)||""} onChange={e=>setForm(f=>({...f,n:parseInt(e.target.value)||""}))}/></div>
              <div><label style={lbl}>Name *</label><input style={inp} value={(form.name as string)||""} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
              <div><label style={lbl}>Reign (e.g. 1978–2005) *</label><input style={inp} value={(form.reign as string)||""} onChange={e=>setForm(f=>({...f,reign:e.target.value}))} placeholder="e.g. 2013–present"/></div>
              <div><label style={lbl}>Nationality (nat) *</label><input style={inp} value={(form.nat as string)||""} onChange={e=>setForm(f=>({...f,nat:e.target.value}))} placeholder="e.g. Argentine"/></div>
            </div>
            <div style={{marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.5rem"}}>
              <input type="checkbox" id="saintCheck" checked={!!form.saint} onChange={e=>setForm(f=>({...f,saint:e.target.checked}))}/>
              <label htmlFor="saintCheck" style={{fontSize:"0.85rem",color:"#555"}}>Canonized as Saint</label>
            </div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Portrait Image URL (img)</label><input style={inp} value={(form.img as string)||""} onChange={e=>setForm(f=>({...f,img:e.target.value}))} placeholder="https://upload.wikimedia.org/..."/></div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Historical Note *</label><textarea style={{...inp,height:"140px",resize:"vertical"}} value={(form.note as string)||""} onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder="Brief description of their pontificate and historical significance..."/></div>
            <div style={{display:"flex",gap:"0.75rem",justifyContent:"flex-end",marginTop:"1rem"}}>
              <button onClick={()=>{setShowForm(false);setEditing(null);}} style={{padding:"0.6rem 1.25rem",border:"1px solid #ddd",borderRadius:"6px",background:"#fff",cursor:"pointer"}}>Cancel</button>
              <button onClick={save} disabled={saving||!form.name||!form.reign||!form.nat} style={{padding:"0.6rem 1.25rem",background:"#1a2744",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontWeight:600,opacity:(!form.name||!form.reign||!form.nat)?0.5:1}}>{saving?"Saving...":"Save Pope"}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{background:"#fff",borderRadius:"10px",border:"1px solid rgba(0,0,0,0.07)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem"}}>
          <thead><tr style={{background:"#f8f8f6",borderBottom:"1px solid #eee"}}>{["#","Name","Reign","Nationality","Saint","Actions"].map(h=><th key={h} style={{padding:"0.75rem 1rem",textAlign:"left",fontWeight:600,color:"#555",fontSize:"0.75rem",textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>
            {loading?<tr><td colSpan={6} style={{padding:"3rem",textAlign:"center",color:"#888"}}>Loading...</td></tr>
              :items.length===0?<tr><td colSpan={6} style={{padding:"3rem",textAlign:"center",color:"#888"}}>No popes added via admin yet. The 265 existing popes come from static data.</td></tr>
              :items.map((item,i)=>(
                <tr key={item._id} style={{borderBottom:"1px solid #f0f0f0",background:i%2===0?"#fff":"#fafafa"}}>
                  <td style={{padding:"0.75rem 1rem",color:"#888"}}>{item.n||"—"}</td>
                  <td style={{padding:"0.75rem 1rem",fontWeight:600,color:"#1a2744"}}>{item.name}</td>
                  <td style={{padding:"0.75rem 1rem",color:"#555"}}>{item.reign}</td>
                  <td style={{padding:"0.75rem 1rem",color:"#555"}}>{item.nat}</td>
                  <td style={{padding:"0.75rem 1rem"}}>{item.saint?<span style={{color:"#c9a84c",fontWeight:700}}>Yes</span>:<span style={{color:"#aaa"}}>No</span>}</td>
                  <td style={{padding:"0.75rem 1rem"}}><div style={{display:"flex",gap:"0.4rem"}}>
                    <button onClick={()=>edit(item)} style={{padding:"0.25rem 0.6rem",background:"#3498db",color:"#fff",border:"none",borderRadius:"4px",fontSize:"0.7rem",cursor:"pointer"}}>Edit</button>
                    <button onClick={()=>del(item._id)} style={{padding:"0.25rem 0.6rem",background:"#e74c3c",color:"#fff",border:"none",borderRadius:"4px",fontSize:"0.7rem",cursor:"pointer"}}>Delete</button>
                  </div></td>
                </tr>
              ))}
          </tbody>
        </table>
        {pages>1&&<div style={{display:"flex",gap:"0.5rem",padding:"1rem",justifyContent:"center",borderTop:"1px solid #eee"}}>{[...Array(pages)].map((_,i)=><button key={i} onClick={()=>load(i+1)} style={{padding:"0.4rem 0.75rem",borderRadius:"5px",border:"1px solid #ddd",background:page===i+1?"#1a2744":"#fff",color:page===i+1?"#fff":"#333",cursor:"pointer",fontSize:"0.8rem"}}>{i+1}</button>)}</div>}
      </div>
    </div>
  );
}
