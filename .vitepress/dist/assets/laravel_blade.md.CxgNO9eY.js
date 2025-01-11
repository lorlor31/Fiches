import{_ as n,c as t,j as s,t as l,a,a2 as r,o as i}from"./chunks/framework.TebtTzPX.js";const P=JSON.parse('{"title":"GENERATEUR DE TEMPLATES BLADE - SYNTAXE","description":"","frontmatter":{},"headers":[],"relativePath":"laravel/blade.md","filePath":"laravel/blade.md"}'),o={name:"laravel/blade.md"},c=s("h1",{id:"generateur-de-templates-blade-syntaxe",tabindex:"-1"},[a("GENERATEUR DE TEMPLATES BLADE - SYNTAXE "),s("a",{class:"header-anchor",href:"#generateur-de-templates-blade-syntaxe","aria-label":'Permalink to "GENERATEUR DE TEMPLATES BLADE - SYNTAXE"'},"​")],-1),d=s("h2",{id:"boucles-et-conditions",tabindex:"-1"},[a("Boucles et conditions "),s("a",{class:"header-anchor",href:"#boucles-et-conditions","aria-label":'Permalink to "Boucles et conditions"'},"​")],-1),p={tabindex:"0"},u=s("thead",null,[s("tr",null,[s("th",null,"Action"),s("th",null,"Syntaxe")])],-1),h=s("tr",null,[s("td",null,"Inclure du php"),s("td",null,"@php ...............@endphp")],-1),_=s("tr",{"!!$maVariable!!":""},[s("td",null,"Afficher la valeur d'une variable"),s("td")],-1),g=s("tr",null,[s("td",null,"Exp pour une img"),s("td",null,'src="/img/{!!$trainingCourse->image_name!!}"')],-1),f=s("td",null,"Afficher la valeur d'une variable",-1),m=s("tr",null,[s("td",null,"if"),s("td",null,"@if(condition) @else .... @endif")],-1),E=s("tr",null,[s("td",null,"foreach"),s("td",null,"@foreach(trucs as truc).... @endforeach")],-1),b=s("tr",null,[s("td",null,"Etendre un template"),s("td",null,"@extends('layouts/frame')")],-1),v=s("tr",null,[s("td",null,"Remplir une section"),s("td",null,"@section('contenu').......@endsection")],-1),A=r(`<h2 id="affichage-messages-d-erreur-success" tabindex="-1">Affichage messages d&#39;erreur /success <a class="header-anchor" href="#affichage-messages-d-erreur-success" aria-label="Permalink to &quot;Affichage messages d&#39;erreur /success&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>@if ($message = Session::get(&#39;success&#39;))</span></span>
<span class="line"><span>&lt;div class=&quot;alert alert-success&quot; role=&quot;alert&quot;&gt;</span></span>
<span class="line"><span>    &lt;strong&gt;{{ $message }}&lt;/strong&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>@endif</span></span>
<span class="line"><span></span></span>
<span class="line"><span>@if ( $errors-&gt;any() )</span></span>
<span class="line"><span>&lt;div class=&quot;container mt-5&quot;&gt;</span></span>
<span class="line"><span>    &lt;div class=&quot;alert alert-danger&quot; role=&quot;alert&quot;&gt;</span></span>
<span class="line"><span>        @foreach($errors-&gt;all() as $error)</span></span>
<span class="line"><span>        &lt;li class=&quot;text-red-500 list-none&quot;&gt;</span></span>
<span class="line"><span>            {{$error}}</span></span>
<span class="line"><span>        &lt;/li&gt;</span></span>
<span class="line"><span>        @endforeach</span></span>
<span class="line"><span>    &lt;/div&gt;</span></span>
<span class="line"><span>&lt;/div&gt;</span></span>
<span class="line"><span>@endif</span></span></code></pre></div>`,2);function T(e,q,x,S,$,N){return i(),t("div",null,[c,d,s("table",p,[u,s("tbody",null,[h,_,g,s("tr",null,[f,s("td",null,l(e.$formattedDate),1)]),m,E,b,v])]),A])}const y=n(o,[["render",T]]);export{P as __pageData,y as default};