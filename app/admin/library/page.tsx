"use client";
import { useEffect, useState, useCallback } from "react";

interface LibraryBook { _id: string; title: string; author: string; category: string; description?: string; content: string; image_url?: string; published_year?: number; slug: string; featured?: boolean; }

const CATEGORIES = ["Theology", "Spirituality", "Church Fathers", "Apologetics", "History", "Other"];
const empty = { title: "", author: "", category: "Theology", description: "", content: "", image_url: "", published_year: "", slug: "", featured: false };

export default function AdminLibrary() {
  const [items, setItems] = useState<LibraryBook[]>([]); const [total, setTotal] = useState(0); const [pages, setPages] = useState(1); const [page, setPage] = useState(1);
  const [search, setSearch] = useState(""); const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); const [form, setForm] = useState<Record<string,unknown>>(empty); const [editing, setEditing] = useState<string|null>(null); const [saving, setSaving] = useState(false);

  const load = useCallback(async (p=1) => {
    setLoading(true);
    const r = await fetch(`/api/admin/library?page=${p}&search=${encodeURIComponent(search)}`);
    const d = await r.json(); setItems(d.items??[]); setTotal(d.total??0); setPages(d.pages??1); setPage(p); setLoading(false);
  }, [search]);

  useEffect(() => { load(1); }, []);

  const save = async () => {
    setSaving(true);
    const body = { ...form, slug: String(form.title||"").toLowerCase().replace(/[^a-z0-9]+/g,"-") };
    await fetch("/api/admin/library", { method: editing?"PUT":"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(editing?{...body,_id:editing}:body) });
    setSaving(false); setShowForm(false); setEditing(null); setForm(empty); load(page);
  };
  const del = async (_id:string) => { if(!confirm("Delete this book?"))return; await fetch("/api/admin/library",{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({_id})}); load(page); };
  const edit = (item:LibraryBook) => { setForm(item as unknown as Record<string,unknown>); setEditing(item._id); setShowForm(true); };

  const inp = {width:"100%",padding:"0.5rem 0.75rem",border:"1px solid #ddd",borderRadius:"6px",fontSize:"0.85rem",boxSizing:"border-box" as const};
  const lbl = {display:"block" as const,fontSize:"0.75rem",fontWeight:600 as const,color:"#555",marginBottom:"0.25rem"};

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"1rem"}}>
        <div><h1 style={{fontFamily:"Georgia, serif",color:"#1a2744",fontSize:"1.5rem",margin:"0 0 0.2rem"}}>Catholic Library</h1><p style={{color:"#888",fontSize:"0.8rem",margin:0}}>{total} books in library</p></div>
        <div style={{display:"flex",gap:"0.5rem"}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load(1)} placeholder="Search books..." style={{...inp,width:"200px"}}/>
          <button onClick={()=>load(1)} style={{padding:"0.5rem 1rem",background:"#1a2744",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"0.85rem"}}>Search</button>
          <button onClick={()=>{setForm(empty);setEditing(null);setShowForm(true);}} style={{padding:"0.5rem 1rem",background:"#c9a84c",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontSize:"0.85rem",fontWeight:600}}>+ Add Book</button>
        </div>
      </div>

      {showForm && (
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
          <div style={{background:"#fff",borderRadius:"12px",padding:"2rem",width:"100%",maxWidth:"700px",maxHeight:"90vh",overflowY:"auto"}}>
            <h2 style={{fontFamily:"Georgia, serif",color:"#1a2744",margin:"0 0 1.5rem"}}>{editing?"Edit":"Add"} Library Book</h2>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem",marginBottom:"1rem"}}>
              <div><label style={lbl}>Title *</label><input style={inp} value={(form.title as string)||""} onChange={e=>setForm(f=>({...f,title:e.target.value}))}/></div>
              <div><label style={lbl}>Author *</label><input style={inp} value={(form.author as string)||""} onChange={e=>setForm(f=>({...f,author:e.target.value}))}/></div>
              <div><label style={lbl}>Category *</label>
                <select style={inp} value={(form.category as string)||"Theology"} onChange={e=>setForm(f=>({...f,category:e.target.value}))}>
                  {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Published Year</label><input style={inp} type="number" value={(form.published_year as number)||""} onChange={e=>setForm(f=>({...f,published_year:Number(e.target.value)}))}/></div>
            </div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Cover Image URL</label><input style={inp} value={(form.image_url as string)||""} onChange={e=>setForm(f=>({...f,image_url:e.target.value}))} placeholder="https://..."/></div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Short Description</label><textarea style={{...inp,height:"60px",resize:"vertical"}} value={(form.description as string)||""} onChange={e=>setForm(f=>({...f,description:e.target.value}))}/></div>
            <div style={{marginBottom:"1rem"}}><label style={lbl}>Full Content (Markdown supported) *</label><textarea style={{...inp,height:"180px",resize:"vertical"}} value={(form.content as string)||""} onChange={e=>setForm(f=>({...f,content:e.target.value}))}/></div>
            <div style={{marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.5rem"}}>
              <input type="checkbox" id="featured" checked={Boolean(form.featured)} onChange={e=>setForm(f=>({...f,featured:e.target.checked}))} />
              <label htmlFor="featured" style={{fontSize:"0.8rem",color:"#555"}}>Featured Book</label>
            </div>
            <div style={{display:"flex",gap:"0.75rem",justifyContent:"flex-end",marginTop:"1rem"}}>
              <button onClick={()=>{setShowForm(false);setEditing(null);}} style={{padding:"0.6rem 1.25rem",border:"1px solid #ddd",borderRadius:"6px",background:"#fff",cursor:"pointer"}}>Cancel</button>
              <button onClick={save} disabled={saving||!form.title||!form.author||!form.content} style={{padding:"0.6rem 1.25rem",background:"#1a2744",color:"#fff",border:"none",borderRadius:"6px",cursor:"pointer",fontWeight:600,opacity:(!form.title||!form.author||!form.content)?0.5:1}}>{saving?"Saving...":"Save Book"}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{background:"#fff",borderRadius:"10px",border:"1px solid rgba(0,0,0,0.07)",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.82rem"}}>
          <thead><tr style={{background:"#f8f8f6",borderBottom:"1px solid #eee"}}>{["Title","Author","Category","Status","Actions"].map(h=><th key={h} style={{padding:"0.75rem 1rem",textAlign:"left",fontWeight:600,color:"#555",fontSize:"0.75rem",textTransform:"uppercase"}}>{h}</th>)}</tr></thead>
          <tbody>
            {loading?<tr><td colSpan={5} style={{padding:"3rem",textAlign:"center",color:"#888"}}>Loading...</td></tr>
              :items.length===0?<tr><td colSpan={5} style={{padding:"3rem",textAlign:"center",color:"#888"}}>No books in library. Add one above.</td></tr>
              :items.map((item,i)=>(
                <tr key={item._id} style={{borderBottom:"1px solid #f0f0f0",background:i%2===0?"#fff":"#fafafa"}}>
                  <td style={{padding:"0.75rem 1rem",fontWeight:600,color:"#1a2744"}}>{item.title}</td>
                  <td style={{padding:"0.75rem 1rem",color:"#555"}}>{item.author}</td>
                  <td style={{padding:"0.75rem 1rem"}}><span style={{padding:"0.2rem 0.6rem",borderRadius:"20px",fontSize:"0.7rem",background:"#f0f0f8",color:"#3a3a8c"}}>{item.category}</span></td>
                  <td style={{padding:"0.75rem 1rem"}}>{item.featured?<span style={{padding:"0.2rem 0.6rem",borderRadius:"20px",fontSize:"0.7rem",background:"#fff3e0",color:"#e67e22"}}>Featured</span>:"Standard"}</td>
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
